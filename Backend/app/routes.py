from app import app, db
from flask import request, jsonify, g
from flask_jwt_extended import jwt_required, create_access_token,get_jwt_identity
from app.models import Dozent, Kurs, Semester
from datetime import timedelta, date
from sqlalchemy import and_

@app.route('/vorlesung/add', methods=['POST'])
def add_vorlesung():
    pass


@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    mail = request.json.get('mail', None)
    password = request.json.get('password', None)
    if not mail:
        return jsonify({"msg": "Missing mail parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user = Dozent.query.filter_by(mail=mail).first()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401

    # Identity can be any data that is json serializable
    expires = timedelta(days=3)
    access_token = create_access_token(identity=mail, expires_delta=expires)
    g.mail = mail
    return jsonify(access_token=access_token), 200

@app.route('/sign_up', methods=['POST'])
@jwt_required
def sign_up():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    if not check_privileges(get_jwt_identity(), [1]):
        return jsonify({"msg": "You are not allowed to do this, please contact an admin"}), 403

    mail = request.json.get('mail', None)
    password = request.json.get('password', None)
    if not mail:
        return jsonify({"msg": "Missing mail parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if Dozent.query.filter_by(mail=mail).first() is not None:
        return jsonify({"msg": "User with this mail address already exists"}), 400

    titel = request.json.get('titel', None)
    vorname = request.json.get('vorname', None)
    nachname = request.json.get('nachname', None)
    dozent = Dozent(mail=mail, titel=titel, vorname=vorname, nachname=nachname)
    dozent.set_password(password)
    db.session.add(dozent)
    db.session.commit()
    return jsonify({"msg": "User created"}), 202

@app.route('/create/kurs', methods=['POST'])
@jwt_required
def create_kurs():
    if check_privileges(get_jwt_identity(), [1]):
        name = request.json.get("name", None)
        if Kurs.query.filter_by(name=name).first() is None:
            db.session.add(Kurs(name=name))
            db.session.commit()
        else:
            return jsonify({"msg": 'A Kurs with this name already exists'}), 400
    else:
        return jsonify({"msg": "You are not allowed to do this, please contact an admin"}), 403
    return jsonify({"msg": "Kurs created"}), 202

@app.route('/create/semester', methods=['POST'])
@jwt_required
def create_semester():
    if check_privileges(get_jwt_identity(), [1]):
        start = request.json.get("start", None)
        start = date(start[0],start[1],start[2])
        ende = request.json.get("ende", None)
        ende = date(ende[0], ende[1], ende[2])
        name = request.json.get("name", None)
        kurs_name = request.json.get("kurs", None)
        kurs = Kurs.query.filter_by(name=kurs_name).first()
        if kurs is not None:
            if Semester.query.filter(and_(Semester.name == name, Semester.kurs_name == kurs.name)).first() is None:
                new_semester = Semester(name=name,kurs_name=kurs_name,start=start,ende=ende)
                db.session.add(new_semester)
                db.session.commit()
            else:
                return jsonify({"msg": 'A Semester with this number already exists'}), 400
    else:
        return jsonify({"msg": "You are not allowed to do this, please contact an admin"}), 403
    return jsonify({"msg": "Kurs created"}), 202

"""
    Params:     current_user: mail of the user, making this request
                check: list of vorlesungen, checking privileges for
    Return:     True if the user "gibt" all the vorlesungen
"""
def check_privileges(current_user, check):
    user = Dozent.query.filter_by(mail=current_user).first()
    if user is None:
        return False
    vorlesungen = user.vorlesungen.all()
    vorlesung_id = []
    for lesung in vorlesungen:
        vorlesung_id.append(lesung.id)
    print (vorlesung_id)
    print (check)
    return set(check).issubset(set(vorlesung_id))


    