from app import app, db
from flask import request, jsonify, abort
from flask_jwt_extended import jwt_required, create_access_token,get_jwt_identity
from app.models import Dozent, Kurs, Semester, Vorlesung, Termin
from datetime import timedelta, date, datetime
from sqlalchemy import and_


#Getter
############################################

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
    return jsonify(access_token=access_token), 200

""" Liefert alle Termine für einen bestimmten Zeitraum für einen Kurs, wobei nur bei den Kursen, worauf der Requester Zugriff hat, der
    Vorlesungsname angezeigt wird. Ein Admin kann somit alle Termine sehen.
"""

@app.route('/get/termine/fortimeandkurs', methods=['POST'])
@jwt_required
def vorlesung_fortimeandkrus():
    kurs = request.json.get("kurs", None)
    start = request.json.get("start", None)
    start = date(start[0],start[1],start[2])
    ende = request.json.get("ende", None)
    ende = date(ende[0], ende[1], ende[2])
    mail = get_jwt_identity()
    requester_vorlesungen = Dozent.query.filter_by(mail = mail).first().vorlesungen.all()
    requester_privileges = []
    for vorlesung in requester_vorlesungen:
        requester_privileges.append(vorlesung.id)

    vorlesungen = Vorlesung.query.filter_by(kurs_name=kurs).all()
    termine = []
    for vorlesung in vorlesungen:
        for termin in vorlesung.termine:
            termine.append(termin)

    termine_out = []
    for termin in termine: 
        termin_out = {}
        termin = termin.__dict__
        if check_privileges(mail, int(termin["vorlesung_id"])):#anonymisieren
            termin_out['vorlesung'] = Vorlesung.query.get(termin["vorlesung_id"]).name
        else:
            termin_out['vorlesung'] = "Hidden"
        termin_out['start'] = [termin['start'].year,termin['start'].month,termin['start'].day,termin['start'].hour,termin['start'].minute]
        termin_out['ende'] = [termin['ende'].year,termin['ende'].month,termin['ende'].day,termin['ende'].hour,termin['ende'].minute]
        print(termin_out)
        termine_out.append(termin_out)

    return jsonify({"termine": termine_out}), 200

""" Liefert alle anstehenden Termine für einen bestimmten Dozenten, unabhängig von Kurs und Zeit.
"""
@app.route('/get/termine/fordozent')
@jwt_required
def vorlesung_fordozent():
    pass

#Creater
###########################################

@app.route('/create/termin', methods=['POST'])
@jwt_required
def add_termine():
    json, token = request.get_json(), get_jwt_identity()
    for obj in json["termine"]: 
        termin = termin_helper(obj, token)
        db.session.add(termin)
    db.session.commit()
    return jsonify({"msg": "Termine erstellt"}), 202



@app.route('/sign_up', methods=['POST'])
@app.route('/create/dozent', methods=['POST'])
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
    #TODO: Beim erstellen Vorlesung hinzufügen
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
    return jsonify({"msg": "Semester created"}), 202


@app.route('/create/vorlesung', methods=['POST'])
@jwt_required
def create_vorlesung():
    if check_privileges(get_jwt_identity(), [1]):
        std_anzahl = request.json.get("std_anzahl", None)
        name = request.json.get("name", None)
        kurs_name = request.json.get("kurs", None)

        if Vorlesung.query.filter(and_(Vorlesung.name==name, Vorlesung.kurs_name==kurs_name)).first() is not None:
            return jsonify({"msg": "Vorlesung with this name for this kurs already exists"}), 400

        vorlesung = Vorlesung(std_anzahl=std_anzahl, name=name,kurs_name=kurs_name)
        db.session.add(vorlesung)
        db.session.commit()
    else:
        return jsonify({"msg": "You are not allowed to do this, please contact an admin"}), 403
    return jsonify({"msg": "Vorlesung created"}), 202

#Helper
###########################################

"""
    Params:     current_user: mail of the user, making this request
                check: list of vorlesungen(id), checking privileges for
    Return:     True if the user "gibt" all the vorlesungen
"""
def check_privileges(current_user, check):
    print(type(check))
    if not ((type(check) is int) or (type(check) is list)):
        raise ValueError("Check has to be a list or an integer")
    check = []
    check.append(check)

    user = Dozent.query.filter_by(mail=current_user).first()
    if user is None:
        return False
    vorlesungen = user.vorlesungen.all()
    vorlesung_id = []
    for lesung in vorlesungen:
        vorlesung_id.append(lesung.id)
    if 1 in vorlesung_id:
        return True
    return set(check).issubset(set(vorlesung_id))


"""
    termin_helper creates a Termin for a Vorlesung by the give Obj v and returns this Termin object
    Params:     v: vorlesungsobject
                jwt_token: JWT Access Token
    Return:     True if the Dozent has access to this Vorlesung
"""
def termin_helper(v, jwt_token):
    v_name = v["name"]
    kurs = v["kurs"]
    startDate = datetime(v["startDate"][0],v["startDate"][1], v["startDate"][2],v["startDate"][3],v["startDate"][4])
    endDate = datetime(v["endDate"][0],v["endDate"][1],v["endDate"][2],v["endDate"][3],v["endDate"][4])
    v_id = Vorlesung.query.filter_by(name=v_name, kurs_name=kurs).first()
    if not is_period_free(kurs, startDate, endDate):
        abort(400, {'message' : 'timeframe is occupied: ' + startDate+" - "+endDate})
    if v_id is None:
        abort(400, {'message' : 'No Vorlesung found for '+v_name+' and ' + kurs})
    if not check_privileges(jwt_token, [v_id]):
        abort(403, {'message': 'No permissions to create Termin for ' + str(v_id.name)})
    return Termin(start=startDate, ende=endDate, vorlesung_id = v_id.id)

"""
    is_period_free checks if and given period is blocked by another termin for the given kurs. 
    Params:     kurs:   the kurs, which timetable will be checked
                start:  start of the checking period
                end:    end of the checking period
    Return:     True if nothing is happening for the kurs form start to end
"""
def is_period_free(kurs, start, ende):
    vorlesungen = Vorlesung.query.filter_by(kurs_name=kurs).all()
    termine = []
    for vorlesung in vorlesungen:
        for termin in vorlesung.termine:
            termine.append(termin)
    for termin in termine:
        if not((start < termin.start and ende <= termin.start) or start >= termin.ende):
            return False
    return True
   

    