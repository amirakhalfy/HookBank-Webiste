from flask import request, jsonify
from config import app, db
from models import User, Role, Individual

@app.route("/create_individual", methods=["POST"])
def create_individual():
    id_user = request.json.get("userId")
    emp_title = request.json.get("empTitle")
    term = request.json.get("term")
    loan_amnt = request.json.get("loanAmnt")
    purpose = request.json.get("purpose")
    home_ownership = request.json.get("homeOwnership")
    dti = request.json.get("dti")
    grade = request.json.get("grade")
    annual_inc = request.json.get("annualInc")
    int_rate = request.json.get("intRate")

    missing_fields = []
    # Add checks for missing fields similar to the create_small_enterprise function
    # ...              
 
    user = User.query.get(id_user)
    if not user or user.role != Role.Individual:
        return (
            jsonify({"message": "User does not have permission to create an individual record"}),
            403,
        )

    new_individual = Individual(
        user_id=id_user,
        emp_title=emp_title,
        term=term,
        loan_amnt=loan_amnt,
        purpose=purpose,
        home_ownership=home_ownership,
        dti=dti,
        grade=grade,
        annual_inc=annual_inc,
        int_rate=int_rate
    )

    try:
        db.session.add(new_individual)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Individual record created!"}), 201

@app.route("/individuals", methods=["GET"])
def get_individuals():
    individuals = Individual.query.all()
    json_individuals = [
        {
            "id": individual.id,
            "userId": individual.user_id,
            "empTitle": individual.emp_title,
            "term": individual.term,
            "loanAmnt": individual.loan_amnt,
            "purpose": individual.purpose,
            "homeOwnership": individual.home_ownership,
            "dti": individual.dti,
            "grade": individual.grade,
            "annualInc": individual.annual_inc,
            "intRate": individual.int_rate
        }
        for individual in individuals
    ]
    return jsonify({"individuals": json_individuals})

@app.route("/individuals_user/<int:user_id>", methods=["GET"])
def get_user_individuals(user_id):
    individuals = Individual.query.filter_by(user_id=user_id).all()

    if not individuals:
        return jsonify({"message": "No individual records found for the given user ID"}), 404

    json_individuals = [
        {
            "id": individual.id,
            "userId": individual.user_id,
            "empTitle": individual.emp_title,
            "term": individual.term,
            "loanAmnt": individual.loan_amnt,
            "purpose": individual.purpose,
            "homeOwnership": individual.home_ownership,
            "dti": individual.dti,
            "grade": individual.grade,
            "annualInc": individual.annual_inc,
            "intRate": individual.int_rate
        }
        for individual in individuals
    ]

    return jsonify({"individuals": json_individuals})


