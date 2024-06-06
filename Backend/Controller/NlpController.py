import librosa 
import librosa.display
import IPython.display as ipd
import os
from glob import glob
import matplotlib.pyplot as plt
from IPython.display import Audio, display
import random 
import numpy as np 
import os
import pandas as pd
from langdetect import detect
import speech_recognition as sr
import re
from googletrans import Translator
import nltk
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk import pos_tag
from config import app, db
from flask import Flask, request, jsonify

# Initialize translator
translator = Translator()


@app.route('/nlp', methods=['POST'])
def nlp():
    def transcribe_audio(audio_file):
        recognizer = sr.Recognizer()
        try:
            with sr.AudioFile(audio_file) as source:
                audio_data = recognizer.record(source)
            transcribed_text = recognizer.recognize_google(audio_data)
            return transcribed_text
        except sr.UnknownValueError:
            return "Recognition could not understand audio"
        except sr.RequestError as e:
            return f"Error with the speech recognition service: {str(e)}"
        except Exception as e:
            return f"Error processing audio: {str(e)}"
    def detect_language(text):
        try:
            language = detect(text)
            return language
        except:
            return "unknown"

    def extract_credit_amount(transcribed_text):
        pattern = r'\b(?:\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?: million|billion|euro|dinar)?\b'
        matches = re.findall(pattern, transcribed_text, flags=re.IGNORECASE)
        return matches
    def translate_to_french(text):
        try:
            french_translation = translator.translate(text, src='en', dest='fr').text
            return french_translation
        except Exception as e:
            print(f"Error translating to French: {str(e)}")
            return "Translation to French is currently unavailable"

    def translate_to_arabic(text):
        try:
            arabic_translation = translator.translate(text, src='en', dest='ar').text
            return arabic_translation
        except Exception as e:
            print(f"Error translating to Arabic: {str(e)}")
            return "Translation to Arabic is currently unavailable"

    def convert_currency(amount, from_currency, to_currency):
        if from_currency in conversion_rates and to_currency in conversion_rates[from_currency]:
            return amount * conversion_rates[from_currency][to_currency]
        else:
            return "Conversion rate not available"
    def tokenize_text(text):
        tokens = word_tokenize(text)
        return tokens
    
    def remove_numericals(text):
        return re.sub(r'\d+', '', text)

    def pos_tagging(tokens):
        tagged_tokens = pos_tag(tokens)
        return tagged_tokens
    def remove_stopwords(text, stopwords_list):
        filtered_text = [word for word in text.split() if word.lower() not in stopwords_list]
        return ' '.join(filtered_text)

# Define the folder containing audio files
    ff = request.files['audio']
    filename = ff.filename.split('/')[-1]
    print(filename)

    conversion_rates = {
        'USD': {'TND': 3.1, 'EUR': 0.82},  # Example conversion rates, replace with actual values
    }

    # Save the file
    audio_folder = "C:/deploiement/credit-scoring-website/deploiementbfifinal/credit-scoring-website/Backend/Controller/audios"

# Save the file with the correct path
    file_path = os.path.join(audio_folder, filename)
    ff.save(file_path)

    data = []
    if filename.endswith(".wav"):  # Adjust file extension as per your audio files
        
        # Transcribe audio file
        transcription = transcribe_audio(file_path)
        print("transcription : ",transcription)
        # Detect language
        language = detect_language(transcription)
        
        # Extract credit amounts
        credit_amounts = extract_credit_amount(transcription)
        
        french_translation = translate_to_french(transcription)
        
        arabic_translation = translate_to_arabic(transcription)
        dinar_credit_amounts = [convert_currency(float(amount.replace(',', '').replace(' ', '')), 'USD', 'TND') for amount in credit_amounts]
        euro_credit_amounts = [convert_currency(float(amount.replace(',', '').replace(' ', '')), 'USD', 'EUR') for amount in credit_amounts]
        for amount, dinar_amount, euro_amount in zip(credit_amounts, dinar_credit_amounts, euro_credit_amounts):
            data.append({
                'File Name': filename, 
                'Language': language,
                'Transcription': f"{language}: {transcription}",
                'Translated Transcription (French)': f"French: {french_translation}",
                'Translated Transcription (Arabic)': f"Arabic: {arabic_translation}",
                'Credit Amounts': amount,
                'Converted Credit Amounts (Dinar)': dinar_amount,
                'Converted Credit Amounts (Euro)': euro_amount
            })

    df = pd.DataFrame(data)
    nltk.download('punkt')
    for column in ['Transcription', 'Translated Transcription (French)', 'Translated Transcription (Arabic)']:
        df[column + '_Tokens'] = df[column].apply(tokenize_text)
    nltk.download('stopwords')
    tfidf_vectorizer_transcription = TfidfVectorizer(max_features=1000, stop_words='english')
    additional_stopwords = {'hello', 'morning', 'want', 'need',"searching", "applying", "seeking", "loan", "credit","request","billion","dollar","euro","dinar","buy","make","domain","field","amount"}  # Add any other words you want to exclude
    stopwords_list = set(stopwords.words('english')).union(additional_stopwords)
    tfidf_vectorizer = TfidfVectorizer()
    df['Filtered_Transcription'] = df['Transcription'].apply(lambda x: remove_stopwords(x, stopwords_list))
    df['Filtered_Transcription'] = df['Filtered_Transcription'].apply(remove_numericals)
    tfidf_vectorizer_transcription = TfidfVectorizer(max_features=1000, stop_words='english')

    tfidf_matrix_transcription = tfidf_vectorizer.fit_transform(df['Filtered_Transcription'])
    feature_names_transcription = tfidf_vectorizer.get_feature_names_out()
    keyword_indices_transcription = tfidf_matrix_transcription.argmax(axis=1)
    keywords_transcription = [feature_names_transcription[idx] for idx in keyword_indices_transcription]

    df['Keywords_Transcription'] = keywords_transcription


    def remove_numericals1(text):
        return re.sub(r'\d+', '', text)
# Define a function to remove stopwords
    def remove_stopwords1(text, stopwords_list):
        filtered_text = [word for word in text.split() if word.lower() not in stopwords_list]
        return ' '.join(filtered_text)

# Define additional stopwords to be removed
    additional_stopwords = {'hello', 'morning', 'want', 'need',"searching", "applying", "seeking", "loan", "credit","requesting","pay","require"}  # Add any other words you want to exclude

# Combine NLTK stopwords with additional stopwords
    stopwords_list = set(stopwords.words('english')).union(additional_stopwords)

# Initialize TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()

# Preprocess the text to remove stopwords
    df['Loan Purpose'] = df['Transcription'].apply(lambda x: remove_stopwords1(x, stopwords_list))
    df['Loan Purpose'] = df['Filtered_Transcription'].apply(remove_numericals1)

# Apply TF-IDF vectorization to the filtered transcriptions
    tfidf_matrix_transcription = tfidf_vectorizer.fit_transform(df['Filtered_Transcription'])

# Extract keywords based on TF-IDF scores for filtered transcriptions
    feature_names_transcription = tfidf_vectorizer.get_feature_names_out()
    keyword_indices_transcription = tfidf_matrix_transcription.argmax(axis=1)
    keywords_transcription = [feature_names_transcription[idx] for idx in keyword_indices_transcription]

# Add keywords to DataFrame
    df['Keywords_Transcription'] = keywords_transcription
    nltk.download('averaged_perceptron_tagger')

# Define a function to apply POS tagging to tokenized text
    def pos_tagging(tokens):
    # Perform POS tagging
        tagged_tokens = pos_tag(tokens)
    # Return the tagged tokens
        return tagged_tokens

    df['POS_Tags'] = df['Transcription_Tokens'].apply(pos_tagging)

    df['Noun_Tokens'] = df['POS_Tags'].apply(lambda tags: [token for token, pos_tag in tags if pos_tag == 'NN'])

# Step 2: Update the "Domain" column with the corrected domain
    df['Domain'] = df['Noun_Tokens'].apply(lambda tokens: ', '.join(tokens))

# Apply POS tagging to the 'Transcription_Tokens' column
    df['POS_Tags'] = df['Transcription_Tokens'].apply(pos_tagging)
    def remove_stopwords2(tags, stopwords_list):
        filtered_tags = [(word, pos_tag) for word, pos_tag in tags if word.lower() not in stopwords_list]
        return filtered_tags

# Define additional stopwords to be removed
    additional_stopwords = {'hello', 'morning', 'want', 'need', 'searching', 'applying', 'seeking', 'loan', 'credit', 'requesting', 'pay', 'require','domain','field','en','on','dollar','billion','dollar','euro','amount','business'}

# Combine NLTK stopwords with additional stopwords
    stopwords_list = set(stopwords.words('english')).union(additional_stopwords)

# Step 1: Remove stop words from POS tags
    df['Filtered_POS_Tags'] = df['POS_Tags'].apply(lambda tags: remove_stopwords2(tags, stopwords_list))

# Step 2: Extract noun tokens from filtered POS tags
    df['Noun_Tokens'] = df['Filtered_POS_Tags'].apply(lambda tags: [token for token, pos_tag in tags if pos_tag == 'NN'])

# Step 3: Update the "Domain" column with the corrected domain
    df['Domain'] = df['Noun_Tokens'].apply(lambda tokens: ', '.join(tokens))


    first_row = df[['File Name', 'Domain','Converted Credit Amounts (Dinar)','Loan Purpose']].iloc[0]

    file_name = first_row['File Name']
    Domain = first_row['Domain']
    converted_credit_amount = first_row['Converted Credit Amounts (Dinar)']
    Loan_Purpose = first_row['Loan Purpose']

    response = {
        'Domain': Domain,
        'converted_credit_amount': converted_credit_amount,
        'Loan Purpose': Loan_Purpose
        
    }
    return jsonify(response)