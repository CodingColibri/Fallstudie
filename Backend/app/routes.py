from app import app, db
from flask import request, jsonify, abort
from flask_jwt_extended import jwt_required, create_access_token,get_jwt_identity, get_jwt_claims
from app.models import Dozent, Kurs, Semester, Vorlesung, Termin
from datetime import timedelta, date, datetime
from sqlalchemy import and_
from functools import wraps

#Decorators
############################################
def json_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        return f(*args, **kwargs)
    return wrap

#Getter
############################################

@app.route('/login', methods=['POST'])
@json_required
def login():
    mail = request.json.get('mail', None)
    password = request.json.get('password', None)
    if not mail:
        return jsonify({"msg": "Missing mail parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user = Dozent.query.filter_by(mail=mail).first()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401

    user_out = {}
    user_out['mail'] = user.mail
    user_out['titel'] = user.titel
    user_out['vorname'] = user.vorname
    user_out['nachname'] = user.nachname
    user_out['role'] = user.role

    # Identity can be any data that is json serializable
    expires = timedelta(days=3)
    access_token = create_access_token(identity=mail, user_claims=user_out, expires_delta=expires)
    return jsonify(access_token=access_token), 200

""" Liefert alle Termine für einen bestimmten Zeitraum für einen Kurs, wobei nur bei den Kursen, worauf der Requester Zugriff hat, der
    Vorlesungsname angezeigt wird. Ein Admin kann somit alle Termine sehen.
"""

# Best practice would be GET with URL args ?kurs=XXX&start=XXX&end=XXX
@app.route('/termin/fortimeandkurs', methods=['POST'])
@jwt_required
def vorlesung_fortimeandkurs():
    kurs = request.json.get("kurs", None)
    start = request.json.get("start", None)
    start = date.fromtimestamp(start)
    ende = request.json.get("ende", None)
    ende = date.fromtimestamp(ende)
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
        termin_out = termin.to_public()
        # termin = termin.__dict__
        if check_privileges(mail, int(termin.vorlesung_id)):#anonymisieren
            termin_out['vorlesung'] = Vorlesung.query.get(termin.vorlesung_id).name
        else:
            termin_out['vorlesung'] = "Hidden"
        print(termin_out)
        termine_out.append(termin_out)

    return jsonify({"termine": termine_out}), 200

""" Liefert alle anstehenden Termine für einen bestimmten Dozenten, unabhängig von Kurs und Zeit.
    Wird kein Dozent explizit angegeben, wird der anfragende Nutzer verwendet
"""
@app.route('/termin/dozent', methods=['GET'])
@app.route('/termin/dozent/<string:dozent_identity>', methods=['GET'])
@jwt_required
def vorlesung_fordozent(dozent_identity=None):
    jwt_identity = get_jwt_identity()
    jwt_claims = get_jwt_claims()

    if not dozent_identity:
        dozent_identity = jwt_identity

    if dozent_identity != jwt_identity and jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    dozent = Dozent.query.get(dozent_identity)
    if not dozent:
        return jsonify({"msg": "Dozent not exists"}), 404

    vorlesungen = dozent.vorlesungen.all()
    termine = []
    for vorlesung in vorlesungen:
        for termin in vorlesung.termine:
            termine.append(termin)
   
    termine_out = []
    for termin in termine: 
        termin_out = termin.to_public()
        # termin = termin.__dict__
        termin_out['vorlesung'] = Vorlesung.query.get(termin.vorlesung_id).name
        termine_out.append(termin_out)
    
    return jsonify({"termine": termine_out}), 200

@app.route('/dozent', methods=['GET'])
@jwt_required
def get_dozenten():
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403
    
    dozenten = Dozent.query.all()
    if dozenten is None:
        return jsonify({"dozenten": []}), 200

    dozenten_out = []
    for dozent in dozenten_out:
        dozenten_out.append(dozent.to_public())
    
    return jsonify({"dozenten": dozenten_out}), 200

@app.route('/dozent/jwt', methods=['GET'])
@app.route('/dozent/<string:dozent_identity>', methods=['GET'])
@jwt_required
def get_dozent(dozent_identity=None):
    jwt_identity = get_jwt_identity()
    jwt_claims = get_jwt_claims()
    
    if not dozent_identity:
        dozent_identity = jwt_identity
    
    if dozent_identity != jwt_identity and jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    dozent = Dozent.query.get(dozent_identity)
    if not dozent:
        return jsonify({"msg": "Dozent does not exists"}), 404
    
    return jsonify(dozent.to_public()), 200

@app.route('/kurs', methods=['GET'])
@jwt_required
def get_alle_kurse():
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    kurse = Kurs.query.all()
    if not kurse:
        return jsonify({"kurse": []}), 200

    kurse_out = []
    for kurs in kurse:
        kurse_out.append(kurs.to_public())
    
    return jsonify({"kurse": kurse_out}), 200

@app.route('/kurs/<string:kurs_name>', methods=['GET'])
@jwt_required
def get_kurs(kurs_name):
    kurs = Kurs.query.get(kurs_name)
    if not kurs:
        return jsonify({"msg": "Kurs does not exist"}), 404
    
    return jsonify({"kurs": kurs.to_public()}), 200

@app.route('/kurs/<string:kurs_name>/vorlesungen', methods=['GET'])
@jwt_required
def get_vorlesungen_by_kurs(kurs_name):
    kurs = Kurs.query.get(kurs_name)
    if not kurs:
        return jsonify({"msg": "Kurs does not exist"}), 404

    vorlesungen_out = []
    for vorlesung in kurs.vorlesungen:
        vorlesungen_out.append(vorlesung.to_public())

    return jsonify({"vorlesungen": vorlesungen_out}), 200

@app.route('/kurs/<string:kurs_name>/semester', methods=['GET'])
@jwt_required
def get_semester_by_kurs(kurs_name):
    kurs = Kurs.query.get(kurs_name)
    if not kurs:
        return jsonify({"msg": "Kurs does not exist"}), 404

    semesters_out = []
    for semester in kurs.semester:
        semesters_out.append(semester.to_public())

    return jsonify({"semesters": semesters_out}), 200

#Creater
###########################################

@app.route('/dozenten', methods=['POST'])
@jwt_required
@json_required
def save_dozenten():
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    for obj in request.json.get("dozenten", []):
        # TODO: Check if error was returned and return it here again
        # e.g. check if return was a string => error, dozent = object
        #Done?
        cur_dozent = save_dozent(obj)
        if cur_dozent is not Dozent:
            return cur_dozent
        
    db.session.commit()

    dozenten_out = []
    dozenten = Dozent.query.all()
    for dozent in dozenten:
        dozenten_out.append(dozent.to_public())

    return jsonify({"msg": "Dozenten saved", "dozenten": dozenten_out}), 201

# Used to store dozent in db session
def save_dozent(obj):
    mail = obj.get('mail', None)
    password = obj.get('password', None)
    if mail is None:
        return jsonify({"msg": "Missing mail parameter"}), 400
    if password is None:
        return jsonify({"msg": "Missing password parameter"}), 400

    if Dozent.query.filter_by(mail=mail).first() is not None:
        return jsonify({"msg": "User with this mail address already exists"}), 400

    titel = obj.get('titel', None)
    vorname = obj.get('vorname', None)
    nachname = obj.get('nachname', None)
    dozent = Dozent(mail=mail, titel=titel, vorname=vorname, nachname=nachname, role="Dozent")
    dozent.set_password(password)
    db.session.add(dozent)

    return dozent

@app.route('/sign_up', methods=['POST'])
@app.route('/dozent', methods=['POST'])
@jwt_required
@json_required
def sign_up():
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    obj = request.get_json()
    # TODO: Check if error was returned and return it here again
    # e.g. check if return was a string => error, dozent = object 
    # Done?
    dozent = save_dozent(obj)
    if type(dozent) is not Dozent:
        return dozent
    db.session.commit()
    
    return jsonify({"msg": "User created", "user": dozent.to_public() }), 201

@app.route('/vorlesung/<int:id>/termin', methods=['POST'])
@jwt_required
@json_required
def add_termine(id):
    json, token = request.get_json(), get_jwt_identity()
    for obj in json["termine"]: 
        termin = termin_helper(id, obj, token)
        try:
            old_termin = Termin.query.get(obj['id'])
            old_termin.start = termin.start
            old_termin.ende = termin.ende
            old_vorlesung_id = termin.vorlesung_id
            db.session.commit()
            return jsonify({"msg": "Termine geupdated"}), 201
        except Exception as e:
            print(e)
            db.session.add(termin)
            db.session.commit()
    return jsonify({"msg": "Termine erstellt"}), 201

@app.route('/kurs', methods=['POST'])
@jwt_required
@json_required
def create_kurs():
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403
    
    name = request.json.get("name", None)
    studiengangsleiter = request.json.get("studiengangsleiter", None)
    studienjahrgang = request.json.get("studienjahrgang", None)
    if Kurs.query.filter_by(name=name).first() is not None:
        return jsonify({"msg": 'A Kurs with this name already exists'}), 400
    
    kurs = Kurs(name=name, studiengangsleiter=studiengangsleiter, studienjahrgang=studienjahrgang)
    db.session.add(kurs)
    db.session.commit()

    return jsonify({"msg": "Kurs created", "kurs": kurs.to_public()}), 201


@app.route('/kurs/<string:kurs_name>/semester', methods=['POST'])
@jwt_required
@json_required
def save_semester_by_kurs(kurs_name):
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    kurs = Kurs.query.filter_by(name=kurs_name).first()
    if kurs is None:
        return jsonify({"msg": 'The kurs '+kurs_name+' does not exist'}), 404
    
    if len(kurs.semester) > 6:
        return jsonify({"msg": 'The kurs '+kurs_name+' has reached the maximum amount of semester (6)'}), 404

    for obj in request.json.get("semesters", []): 
        semesterID = obj.get("semesterID", None)
        start = obj.get("start")
        start = date.fromtimestamp(start)
        ende = obj.get("ende")
        ende = date.fromtimestamp(ende)
        id = obj.get("id", None)
        existingSemester = Semester.query.filter(and_(Semester.semesterID == semesterID, Semester.kurs_name == kurs.name)).first()
        if existingSemester is not None and existingSemester.id != id:
            return jsonify({"msg": 'A Semester with the given semesterID already exists for the given kurs'}), 400

        # If id is given update already existing row in database otherwise its a new semester
        if id is not None:
            semester = Semester.query.filter(Semester.id == id)
            if semester is None:
                return jsonify({"msg": 'Semester with id '+id+' does not exist yet'}), 400
            semester.update({"semesterID": semesterID,"kurs_name": kurs_name,"start":start,"ende":ende})
        else:
            semester = Semester(semesterID=semesterID,kurs_name=kurs_name,start=start,ende=ende)
            db.session.add(semester)
        
    db.session.commit()

    semesters_out = []
    semesters = Semester.query.filter(Semester.kurs_name == kurs.name).all()
    for semester in semesters:
        semesters_out.append(semester.to_public())

    return jsonify({"msg": "Semesters saved", "semesters": semesters_out}), 201


@app.route('/kurs/<string:kurs_name>/vorlesung', methods=['POST'])
@jwt_required
@json_required
def create_vorlesung_by_kurs(kurs_name):
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    std_anzahl = request.json.get("std_anzahl", None)
    name = request.json.get("name", None)
    dozenten = request.json.get("dozenten", None)

    kurs = Kurs.query.filter_by(name=kurs_name).first()
    if kurs is None:
        return jsonify({"msg": 'The kurs '+kurs_name+' does not exist'}), 400

    if Vorlesung.query.filter(and_(Vorlesung.name==name, Vorlesung.kurs_name==kurs_name)).first() is not None:
        return jsonify({"msg": "Vorlesung with this name for this kurs already exists"}), 400

    vorlesung = Vorlesung(std_anzahl=std_anzahl, name=name,kurs_name=kurs_name)

    for dozent_identify in dozenten:
        dozent = Dozent.query.get(dozent_identify)
        if not dozent:
            return jsonify({"msg": 'Dozent with mail '+dozent_identify+' does not exist'}), 400
        vorlesung.dozenten.append(dozent)

    db.session.add(vorlesung)
    db.session.commit()
        
    return jsonify({"msg": "Vorlesung created", "vorlesung": vorlesung.to_public()}), 201

#Delete
###########################################
@app.route('/kurs/<string:kurs_name>', methods=['DELETE'])
@jwt_required
def delete_kurs(kurs_name):
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    kurs = Kurs.query.get(kurs_name)
    vorlesungen = kurs.vorlesungen
    termine = []
    for vorlesung in vorlesungen:
        vorlesung.dozenten = [] #Delete Dozent Vorlesung reference
        temp_termine = vorlesung.termine
        for termin in temp_termine:
            db.session.delete(termin) #Delete Termine for Vorlesung
        db.session.delete(vorlesung)
    
    semester = kurs.semester
    for obj in semester:
        db.session.delete(obj)

    try:
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({"msg": "Could not fullfill prerequisites for deleting this kurs"}), 500

    db.session.delete(kurs)
    db.session.commit()
    print(semester)
    return jsonify({"msg": "Kurs (and all references) delted"}), 200

#TODO:/vorlesung/<int:vorlesung_id>/ benötigt?
@app.route('/vorlesung/<int:vorlesung_id>/termin/<int:termin_id>', methods=['DELETE'])
@jwt_required
def delete_termin(termin_id, vorlesung_id):
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403

    termin = Termin.query.get(termin_id)
    db.session.delete(termin) #Delete Termin 

    try:
        db.session.commit()
        return jsonify({"msg": "Termin deleted"}), 200
    except:
        db.session.rollback()
        return jsonify({"msg": "Could not fullfill prerequisites for deleting this termin"}), 500

    

#Changer
###########################################

@app.route('/change/dozentgibtvorlesung', methods=['POST'])
@jwt_required
def dozentgibtvorlesung():
    jwt_claims = get_jwt_claims()
    if jwt_claims['role'] != 'admin':
        return jsonify({"msg": "Permission denied"}), 403
    
    dozent = Dozent.query.get(request.json.get("mail",None))
    vorlesung = Vorlesung.query.filter(and_(Vorlesung.name == request.json.get("name",None), Vorlesung.kurs_name == request.json.get("kurs",None))).first()
    vorlesung.dozenten.append(dozent)
    db.session.add(dozent)
    db.session.commit()
    return jsonify({"msg": "Dozent und Vorlesung verknüpft"}), 202

#Helper
###########################################


"""
    Params:     current_user: mail of the user, making this request
                pCheck: list of vorlesungen(id), checking privileges for
    Return:     True if the user "gibt" all the vorlesungen
"""
#TODO: Rework for Admin and testing
def check_privileges(current_user, pCheck):
    print(type(pCheck))
    if (type(pCheck) is int):
        check = []
        check.append(check)
    elif (type(pCheck) is list):
        check = pCheck
    else:
        raise ValueError("Check has to be a list or an integer")

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
    termin_helper creates a Termin for a Vorlesung by the given Obj obj and returns this Termin object
    Params:     obj: termin
                jwt_token: JWT Access Token
    Return:     True if the Dozent has access to this Vorlesung
"""
def termin_helper(id, obj, jwt_token):
    startDate = datetime.fromtimestamp(obj["startDate"])
    endDate = datetime.fromtimestamp(obj["endDate"])
    vorlesung = Vorlesung.query.get(id)

    if vorlesung is None:
        abort(400, {'message' : 'No Vorlesung found for id '+ str(id)})
    if not is_period_free(str(vorlesung.kurs), startDate, endDate):
        abort(400, {'message' : 'timeframe is occupied: ' + startDate+" - "+endDate})
    """if not check_privileges(jwt_token, [vorlesung]):
        abort(403, {'message': 'No permissions to create Termin for ' + str(vorlesung.name)})"""
    
    return Termin(start=startDate, ende=endDate, vorlesung_id = id)

"""
    is_period_free checks if and given period is blocked by another termin for the given kurs. 
    Params:     kurs:   the kurs, which timetable will be checked
                start:  start of the checking period
                end:    end of the checking period
    Return:     True if nothing is happening for the kurs form start to end
"""#TODO: check me
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