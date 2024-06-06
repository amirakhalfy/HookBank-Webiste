from flask import Flask, request, jsonify
import pandas as pd
import joblib
from config import app, db
from sentence_transformers import SentenceTransformer
import numpy as np



data = pd.read_csv('udemy_output_All_Finance__Accounting_p1_p626.csv')
title_df = data[['title']]
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')  
sentence_embeddings = sbert_model.encode(title_df['title'])
rejection_causes = []


@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    rejection_cause = data.get('rejection_cause')
    rejection_causes.append(rejection_cause)

    if not rejection_cause:
        return jsonify({'error': 'Rejection cause not provided in JSON payload'}), 400

    for cause in rejection_causes:
        query_title = cause
        query_embedding = sbert_model.encode([query_title])
        cosine_similarities_sbert = np.dot(sentence_embeddings, query_embedding.T).ravel()

        top_indices_sbert = cosine_similarities_sbert.argsort()[-5:][::-1]
        result = []
        for idx in top_indices_sbert:
            result.append(title_df.iloc[idx]['title'])
    response = {
        'rejection_cause': rejection_cause,
        'recommended_courses': result
    }

    return jsonify(response)

