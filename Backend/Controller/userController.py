from flask import request, jsonify
from config import app, db
from models import User






@app.route("/create_user", methods=["POST"])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")
    role = request.json.get("role")
    access = request.json.get("access")

    if not email or not password or not role:
        return (
            jsonify({"message": "You must include an email, password, and role"}),
            400,
        )

    new_user = User(email=email, password=password, role=role, access = access, loan_amount = None)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = [{"id": user.id, "email": user.email, "role": user.role.value , "access" : user.access , "loan_amount" : user.loan_amount} for user in users]
    return jsonify({"users": json_users})


@app.route("/get_user_by_email_password/<user_email>/<user_password>", methods=["GET"])
def get_user_by_email_password(user_email, user_password):
    users = User.query.filter_by(email=user_email, password=user_password).all()

    if not users:
        return jsonify({"message": "No user found for the given email and password"}), 404

    json_users = [{"id": user.id, "email": user.email, "role": user.role.value, "access" : user.access, "loan_amount" : user.loan_amount} for user in users]

    return jsonify({"users": json_users})



@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.role = data.get("role", user.role)
    user.access = data.get("access" , user.access)

    db.session.commit()

    return jsonify({"message": "User updated."}), 200


@app.route("/change_loan_amount/<int:user_id>/loan_amount", methods=["PATCH"])
def update_loan_amount_user(user_id):
    user = User.query.get(user_id)
    loan_amount = request.args.get('loan_amount')

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    user.loan_amount = loan_amount

    db.session.commit()

    return jsonify({"message": "User updated."}), 200


@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200