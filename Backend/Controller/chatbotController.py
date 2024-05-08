from flask import jsonify
from config import app
from models import SmallEntreprise
from openai import OpenAI
from dotenv import load_dotenv
import os
from flask import request

load_dotenv()

api_key = os.getenv("API_KEY")

client = OpenAI(api_key=api_key)

@app.route("/ChatBot/<int:user_id>/user_input", methods=["GET"])
def Chat_Bot_Response(user_id):
    user_input = request.args.get('user_input')
    enterprises = SmallEntreprise.query.filter_by(id_User=user_id).all()

    if not enterprises:
        return jsonify({"message": "No enterprises found for the given user ID"}), 404

    for enterprise in enterprises:
        # Extract features
        features = [
            "Name of the Small Entreprise: " + enterprise.entrepriseName,
            "Number of employees: " + str(enterprise.no_emp),
            "Number of jobs that already Exist: " + str(enterprise.retained_job),
            "Loan term in months: " + str(enterprise.term),
            "Loan amount: " + str(enterprise.gr_appv),
            "0 = Existing business, 1 = New business: " + str(enterprise.new_exist),
            "Unknown industry classification: " + str(enterprise.naics_0),
            "Industry classification: Manufacturing: " + str(enterprise.naics_31_33),
            "Value of the Assets: " + str(enterprise.sba_appv),
            "Low Documents Loan Program: " + str(enterprise.low_doc == 'Y'),  # Convert boolean to string
        ]
        
    # Convert features list to a string
    features_str = ", ".join(features)

    conversation_prompt = [
        {"role": "system", "content": "You are a helpful assistant to improve Credit Scoring Your Named Carthago"},
        {"role": "user", "content": ""},  # Modify this as per your requirement
        {"role": "assistant", "content": "When responding to inquiries about credit scoring, provide financial-oriented insights tailored to enhance Credit Scoring, leveraging the provided dataset: " + features_str + "These are information value in each feature Name of the Small Entreprise: enterpriseName, IV: -Number of employees: no_emp, IV: 0.145318Number of jobs that already Exist: retained_job, IV: 0.164189 Loan term in months: term, IV: 2.361158 Loan amount: gr_appv, IV: 0.281196 0 = Existing business, 1 = New business: new_exist, IV: 0.050015 Unknown industry classification: naics_0, IV: 0.262419 Industry classification: Manufacturing: naics_31_33, IV: 0.058746 Value of the Assets: sba_appv, IV: 0.352343 Low Documents Loan Program: low_doc, IV: 0.111502 that will affect the credit score. Ensure all responses are formatted appropriately for display within the chatbox interface. Additionally, maintain standard conversational responses for general questions like 'hello' and 'hi'."},  
    ]
    conversation_prompt.append({"role": "user", "content": user_input})
    
    response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=conversation_prompt
    )
    
    assistant_response = response.choices[0].message.content

    return jsonify({"Response": assistant_response}), 200

