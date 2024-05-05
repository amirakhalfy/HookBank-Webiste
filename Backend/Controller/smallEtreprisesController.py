from flask import request, jsonify
from config import app, db
from models import User , Role , SmallEntreprise



@app.route("/create_small_enterprise", methods=["POST"])
def create_small_enterprise():
    id_user = request.json.get("userId")
    entreprise_name = request.json.get("entrepriseName")
    term = request.json.get("term")
    no_emp = request.json.get("noEmp")
    new_exist = request.json.get("newExist")
    retained_job = request.json.get("retainedJob")
    rev_line_cr = request.json.get("revLineCr")
    low_doc = request.json.get("lowDoc")
    gr_appv = request.json.get("grAppv")
    sba_appv = request.json.get("sbaAppv")
    naics_0 = request.json.get("naics0")
    naics_31_33 = request.json.get("naics31-33")
    naics_62 = request.json.get("naics62")

    missing_fields = []
    if not id_user:
        missing_fields.append("userId")
    if not entreprise_name:
        missing_fields.append("entrepriseName")
    if not term:
        missing_fields.append("term")
    if not no_emp:
        missing_fields.append("noEmp")
    if not new_exist:
        missing_fields.append("newExist")
    if not retained_job:
        missing_fields.append("retainedJob")
    if not rev_line_cr:
        missing_fields.append("revLineCr")
    if not low_doc:
        missing_fields.append("lowDoc")
    if not gr_appv:
        missing_fields.append("grAppv")
    if not sba_appv:
        missing_fields.append("sbaAppv")
    if naics_0 is None:
        missing_fields.append("naics0")
    if naics_31_33 is None:
        missing_fields.append("naics31-33")
    if naics_62 is None:
        missing_fields.append("naics62")

    if missing_fields:
        return (
            jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}"}),
            400,
        )
    user = User.query.get(id_user)
    if not user or user.role != Role.Small:
        return (
            jsonify({"message": "User does not have permission to create small enterprises"}),
            403,
        )
    new_small_enterprise = SmallEntreprise(
        id_User=id_user,
        entrepriseName=entreprise_name,
        term=term,
        no_emp=no_emp,
        new_exist=new_exist,
        retained_job=retained_job,
        rev_line_cr=rev_line_cr,
        low_doc=low_doc,
        gr_appv=gr_appv,
        sba_appv=sba_appv,
        naics_0=naics_0,
        naics_31_33=naics_31_33,
        naics_62=naics_62
    )
    try:
        db.session.add(new_small_enterprise)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Small enterprise created!"}), 201


@app.route("/small_enterprises", methods=["GET"])
def get_small_enterprises():
    enterprises = SmallEntreprise.query.all()
    json_enterprises = [{"id": enterprise.id_ME, "userId": enterprise.id_User, "entrepriseName": enterprise.entrepriseName, "term": enterprise.term, "noEmp": enterprise.no_emp, "newExist": enterprise.new_exist, "retainedJob": enterprise.retained_job, "revLineCr": enterprise.rev_line_cr, "lowDoc": enterprise.low_doc, "grAppv": enterprise.gr_appv, "sbaAppv": enterprise.sba_appv, "naics0": enterprise.naics_0, "naics31-33": enterprise.naics_31_33, "naics62": enterprise.naics_62} for enterprise in enterprises]
    return jsonify({"enterprises": json_enterprises})



@app.route("/small_enterprises_user/<int:user_id>", methods=["GET"])
def get_user_enterprises(user_id):
    enterprises = SmallEntreprise.query.filter_by(id_User=user_id).all()

    if not enterprises:
        return jsonify({"message": "No enterprises found for the given user ID"}), 404

    json_enterprises = [{
        "id": enterprise.id_ME,
        "userId": enterprise.id_User,
        "entrepriseName": enterprise.entrepriseName,
        "term": enterprise.term,
        "noEmp": enterprise.no_emp,
        "newExist": enterprise.new_exist,
        "retainedJob": enterprise.retained_job,
        "revLineCr": enterprise.rev_line_cr,
        "lowDoc": enterprise.low_doc,
        "grAppv": enterprise.gr_appv,
        "sbaAppv": enterprise.sba_appv,
        "naics0": enterprise.naics_0,
        "naics31-33": enterprise.naics_31_33,
        "naics62": enterprise.naics_62
    } for enterprise in enterprises]

    return jsonify({"enterprises": json_enterprises})




@app.route("/update_small_enterprise/<int:enterprise_id>", methods=["PATCH"])
def update_small_enterprise(enterprise_id):
    enterprise = SmallEntreprise.query.get(enterprise_id)

    if not enterprise:
        return jsonify({"message": "Small enterprise not found"}), 404

    try:
        data = request.json
        enterprise.entrepriseName = data.get("entrepriseName", enterprise.entrepriseName)
        enterprise.term = data.get("term", enterprise.term)
        enterprise.no_emp = data.get("noEmp", enterprise.no_emp)
        enterprise.new_exist = data.get("newExist", enterprise.new_exist)
        enterprise.retained_job = data.get("retainedJob", enterprise.retained_job)
        enterprise.rev_line_cr = data.get("revLineCr", enterprise.rev_line_cr)
        enterprise.low_doc = data.get("lowDoc", enterprise.low_doc)
        enterprise.gr_appv = data.get("grAppv", enterprise.gr_appv)
        enterprise.sba_appv = data.get("sbaAppv", enterprise.sba_appv)
        enterprise.naics_0 = data.get("naics0", enterprise.naics_0)
        enterprise.naics_31_33 = data.get("naics31-33", enterprise.naics_31_33)
        enterprise.naics_62 = data.get("naics62", enterprise.naics_62)

        
        db.session.commit()
        
        return jsonify({"message": "Small enterprise updated successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Failed to update small enterprise: {str(e)}"}), 500



@app.route("/delete_small_enterprise/<int:enterprise_id>", methods=["DELETE"])
def delete_small_enterprise(enterprise_id):
    enterprise = SmallEntreprise.query.get(enterprise_id)

    if not enterprise:
        return jsonify({"message": "Small enterprise not found"}), 404

    db.session.delete(enterprise)
    db.session.commit()

    return jsonify({"message": "Small enterprise deleted!"}), 200


