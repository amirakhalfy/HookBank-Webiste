from flask import request, jsonify
from config import app, db
from Controller.smallEtreprisesController import *
from Controller.userController import *

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
