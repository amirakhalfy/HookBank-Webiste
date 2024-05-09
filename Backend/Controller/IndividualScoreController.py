from flask import request, jsonify
import joblib
from config import app, db
from models import Individual
import numpy as np
import pandas as pd

# Load the pre-trained model
IndividualModel = joblib.load('./individual_model.joblib')

# Custom scoring function
def custom_scorecard(probs, points0=600, odds0=1/19, pdo=20, min_score=300, max_score=850):
    probs = np.clip(probs, 1e-15, 1 - 1e-15)
    odds = probs / (1 - probs)
    factor = pdo / np.log(2)
    offset = points0 - factor * np.log(odds0)
    score = offset - factor * np.log(odds)
    score = np.maximum(score, min_score)
    score = np.minimum(score, max_score)
    return score

# Helper function to map a value to its corresponding bin index
def map_to_bin(value, bins):
    for i, bin_end in enumerate(bins):
        if value <= bin_end:
            return i
    return len(bins) - 1

# Helper function to apply WOE transformation to a value based on its bin index
def apply_woe(value, woe_values):
    return woe_values[value]

# Preprocess user input data to match the format used for training
def preprocess_input(user_data, bin_intervals, woe_values):
    user_woe = {}
    for feature, value in zip(bin_intervals.keys(), user_data):
        bins = bin_intervals[feature]
        woe_feature = woe_values[feature]
        bin_index = map_to_bin(value, bins)
        woe_transformed_value = apply_woe(bin_index, woe_feature)
        user_woe[feature + '_woe'] = woe_transformed_value  # Add '_woe' suffix to match training feature names
    return user_woe

# Predict score for user
def predict_score(user_data, bin_intervals, woe_values, rf):
    user_woe = preprocess_input(user_data, bin_intervals, woe_values)
    user_woe_df = pd.DataFrame([user_woe])
    user_pred = rf.predict_proba(user_woe_df)[:, 1]
    user_score = custom_scorecard(user_pred)
    return user_score[0]

# Example user data

bin_intervals = {
    'emp_title': [70000.0, 130000.0, 135000.0, 150000.0],
    'term': [1.0],
    'loan_amnt': [8000.0, 11000.0, 16000.0],
    'purpose': [2.0, 7.0],
    'home_ownership': [2.0, 3.0],
    'dti': [13.0, 21.0, 26.0, 30.0],
    'grade': [1.0, 2.0, 3.0, 4.0],
    'annual_inc': [45000.0, 75000.0, 105000.0],
    'int_rate': [8.0, 12.5, 16.5, 21.5]
}

woe_values = {
    'emp_title': [-0.109331, -0.058858, 0.190837, -0.129944, 0.349754],
    'term': [-0.264432, 0.654204],
    'loan_amnt': [-0.219281, -0.094177, 0.015205, 0.173924],
    'purpose': [-0.208021, 0.040372, 0.150831],
    'home_ownership': [-0.178142, 0.066363, 0.183184],
    'dti': [-0.370312, -0.071325, 0.193660, 0.402647, 0.677545],
    'grade': [-1.290938, -0.528582, 0.096610, 0.508854, 0.981519],
    'annual_inc': [0.270511, 0.054288, -0.180327, -0.356447],
    'int_rate': [-1.393294, -0.541358, 0.085096, 0.623051, 1.072675]
}


# Define the Flask route for scoring individuals
@app.route("/ScoreIndividual/<int:user_id>", methods=["GET"])
def score_individual(user_id):
    individuals = Individual.query.filter_by(user_id=user_id).all()

    if not individuals:
        return jsonify({"message": "No individuals found for the given user ID"}), 404

    scores = []
    for individual in individuals:
        # Extract features
        features = [
            individual.emp_title,
            individual.term,
            individual.loan_amnt,
            individual.purpose,
            individual.home_ownership,
            individual.dti,
            individual.grade,
            individual.annual_inc,
            individual.int_rate
        ]
        
        # Predict score for the individual
        score = predict_score(features, bin_intervals, woe_values, IndividualModel)
        score = np.round(score)
        # Append the score to the list of scores
        scores.append({"id": individual.id, "score": score})

    return jsonify({"scores": scores}), 200

