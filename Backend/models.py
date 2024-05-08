from enum import Enum
from config import db

class Role(Enum):
    Individual = "Individual"
    Small = "Small"
    Medium = "Medium"
    Large = "Large"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.Enum(Role), nullable=False)
    access = db.Column(db.String(40), nullable=False)
    loan_amount = db.Column(db.Integer)
    

class SmallEntreprise(db.Model):
    id_ME = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_User = db.Column(db.Integer, db.ForeignKey('user.id'))
    entrepriseName = db.Column(db.String(255), nullable=False)
    term = db.Column(db.Integer, nullable=False)
    no_emp = db.Column(db.Integer, nullable=False)
    new_exist = db.Column(db.Integer, nullable=False)  # boolean
    retained_job = db.Column(db.Integer, nullable=False)
    rev_line_cr = db.Column(db.String(1), nullable=False)  # Y/N
    low_doc = db.Column(db.String(1), nullable=False)  # Y/N
    gr_appv = db.Column(db.Float, nullable=False)
    sba_appv = db.Column(db.Float, nullable=False)
    naics_0 = db.Column(db.Boolean, nullable=False)
    naics_31_33 = db.Column(db.Boolean, nullable=False)
    naics_62 = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', backref=db.backref('small_enterprises', lazy=True))

    def __repr__(self):
        return f"<SmallEntreprise {self.id_ME}>"
