from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from config import app, db

gb_regressor = joblib.load('GradientBoostingRegressor.pkl')

scaled_agriculture = pd.read_csv('combined_df.csv')

def print_most_important_feature(scaled_agriculture):
    most_important_features = {}
    financial_features = scaled_agriculture.columns[:-1] 
    independent_variables = scaled_agriculture.columns[:4]  

    for financial_feature in financial_features:
        gb_regressor = GradientBoostingRegressor()  
        gb_regressor.fit(scaled_agriculture[independent_variables], scaled_agriculture[financial_feature])
        feature_importances = gb_regressor.feature_importances_
        most_important_independent_variable = independent_variables[np.argmax(feature_importances)]
        most_important_features[financial_feature] = most_important_independent_variable

    return most_important_features

most_important_features = print_most_important_feature(scaled_agriculture)

@app.route('/agriculture', methods=['POST'])
def agriculture():
    try:
        finance_feature = request.json.get('finance_feature')

        if finance_feature not in most_important_features:
            return jsonify({'error': 'Invalid finance feature'}), 400

        most_important_independent_variable = most_important_features.get(finance_feature)
        independent_variable_value = scaled_agriculture[most_important_independent_variable].iloc[0]
        
        # Perform prediction
        agriculture_effect = gb_regressor.predict([[independent_variable_value]]) 

        response = {
            'finance_feature': finance_feature,
            'most_important_independent_variable': most_important_independent_variable,
            'agriculture_effect': agriculture_effect[0]
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 400


