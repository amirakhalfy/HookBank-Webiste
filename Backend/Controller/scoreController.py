from flask import request, jsonify
import joblib
from config import app, db
from models import SmallEntreprise , User
import numpy as np
import pandas as pd

SmallEntrepriseModel = joblib.load('./SmallEntrepriseModel.joblib')

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
    user_pred = 1 - rf.predict_proba(user_woe_df)[:, 1]
    user_score = custom_scorecard(user_pred)
    return user_score[0]

# Example bin intervals and WOE values
bin_intervals = {
    'NoEmp': [2.0, 4.0, 10.0, 30.0],
    'RetainedJob': [1.0, 5.0, 10.0],
    'Term': [60.0, 65.0, 80.0, 85.0, 240.0],
    'GrAppv': [30000.0, 60000.0, 160000.0],
    'NewExist': [1.0, 2.0],
    'NAICS_0': [1.0],
    'NAICS_31-33': [1.0],
    'SBA_Appv': [30000.0, 60000.0, 230000.0],
    'LowDoc': [1.0]
}

woe_values = {
    'NoEmp': [-0.196029, 0.683810, 0.617254, -0.363849],
    'RetainedJob': [0.683810, -0.672913, -0.417422],
    'Term': [0.617254, -1.827027, 0.461056, 0.669634],
    'GrAppv': [-0.363849, -0.615057, 0.669634],
    'NewExist': [0.411235, -0.122130],
    'NAICS_0': [-0.214446, 1.250462],
    'NAICS_31-33': [-0.054246, 1.088188],
    'SBA_Appv': [0.000638, 0.502397, -0.624083, 0.803272],
    'LowDoc': [1.118207, -0.100633]
}




@app.route("/ScoreSmallEntreprise/<int:user_id>", methods=["GET"])
def Score_Small_Entreprise(user_id):
    enterprises = SmallEntreprise.query.filter_by(id_User=user_id).all()
    user = User.query.filter_by(id =user_id)
    if not enterprises:
        return jsonify({"message": "No enterprises found for the given user ID"}), 404

    scores = []
    for enterprise in enterprises:
        # Extract features
        features = [
            enterprise.no_emp,
            enterprise.retained_job,
            enterprise.term,
            enterprise.gr_appv,  
            enterprise.new_exist, 
            enterprise.naics_0,
            enterprise.naics_31_33,
            enterprise.sba_appv, 
            enterprise.low_doc == 'Y', 
        ]
        
        
        # Predict score for example user
        score = predict_score(features, bin_intervals, woe_values, SmallEntrepriseModel)
        
        # Append the score to the list of scores
        scores.append({"id": enterprise.entrepriseName, "score": score})

    return jsonify({"scores": scores}), 200


