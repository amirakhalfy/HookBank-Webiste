from flask import Flask, request, jsonify
import joblib
import numpy as np
from config import app, db
from scipy.special import expit  # Importing expit function from scipy.special

from models import LargeMediumEntreprises  

# Load the logistic regression model
scoring_model = joblib.load('logistic_model_selected_features.pkl')

# Define the feature names
feature_names = [
    'Actifs_courants',
    'Disponibilites',
    'Stocks',
    'Actifs_a_long_terme',
    'Passifs_courants',
    'Valeur_nette',
    'Benefice_net',
    'Actifs_fixes',
    'Ratio_de_liquidite',
    'Ratio_de_benefice_exploitation',
    'Stockholders_equity_to_fixed_assets_ratio',
    'Current_debt_ratio'
]

risk_levels = [
    "Too High",
    "Very High",
    "High",
    "Average",
    "Low",
    "Very Low"
]

def classify_risk_level(probability):
    if probability < 0.05:
        return risk_levels[0]
    elif 0.05 <= probability < 0.15:
        return risk_levels[1]
    elif 0.15 <= probability < 0.20:
        return risk_levels[2]
    elif 0.20 <= probability < 0.25:
        return risk_levels[3]
    elif 0.25 <= probability < 0.50:
        return risk_levels[4]
    elif 0.50 <= probability < 0.75:
        return risk_levels[5]
    else:
        return None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        email = data.get('rejection_cause')
        user = LargeMediumEntreprises.query.filter_by(email=email).first()
        print(user)
        if user:
            features = [
                user.Actifs_courants,
                user.Disponibilites,
                user.Stocks,
                user.Actifs_a_long_terme,
                user.Passifs_courants,
                user.Valeur_nette,
                user.Benefice_net,
                user.Actifs_fixes,
                user.Ratio_de_liquidite,
                user.Ratio_de_benefice_exploitation,
                user.Stockholders_equity_to_fixed_assets_ratio,
                user.Current_debt_ratio
            ]

            features = np.array(features).reshape(1, -1)  # Reshape to 2D array
            probability_of_default = scoring_model.predict_proba(features)[0][1]
            risk_level = classify_risk_level(probability_of_default)
            return jsonify({'Risk_Level': risk_level}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 400
