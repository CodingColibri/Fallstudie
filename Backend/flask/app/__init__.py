from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


from app import routes, models
from app.models import Vorlesung, Kurs, Dozent

try:
    db.create_all()
except Exception as e:
    print("Fehler beim erstellen der Datenbank?")
    print(e)
try:
    inital_content = [None]*4
    inital_content[0] = Kurs(name="WWI2018A", studienjahrgang=2018, studiengangsleiter="Richter")
    inital_content[1] = Kurs(name="WWI2018H", studienjahrgang=2018, studiengangsleiter="Richter")
    inital_content[2] = Dozent(mail="raymond.bimazubute@lehre.dhbw-stuttgart.de",role="admin", titel="Prof. Dr.", vorname="Raymond", nachname="Bimazubute")
    inital_content[2].set_password("ChangeMe")
    inital_content[3] = Dozent(mail="erich.heumueller@lehre.dhbw-stuttgart.de", role="dozent", titel="Dr.", vorname="Erich", nachname="Heumüller")
    inital_content[3].set_password("ChangeMeToo")
    for obj in inital_content:
        db.session.add(obj)
        try:
            db.session.commit()
        except:
            db.session.rollback()
            print(str(obj) + "already exists")
    print("Initial content created")
except Exception as e:
    db.session.rollback()
    print(e)


"""@app.before_first_request
def create_admin_Vorlesung():
    try:
        db.create_all()
    except Exception as e:
        print("Fehler beim erstellen der Datenbank?")
    try:
        kurs1 = Kurs(name="WWI2018A", studienjahrgang=2018, studiengangsleiter="Richter")
        kurs2 = Kurs(name="WWI2018H", studienjahrgang=2018, studiengangsleiter="Richter")
        vorlesung = Vorlesung(id=1,std_anzahl=0,name="admin",kurs_name="admin")
        admin = Dozent(mail="dev",role="admin")
        admin.set_password("root")
        db.session.add(kurs)
        db.session.add(kurs1)
        db.session.add(kurs2)
        db.session.add(vorlesung)
        db.session.add(admin)
        vorlesung.dozenten.append(admin)
        db.session.commit()
    except Exception as e:
        db.session.close()
        print("Did not create Admin account", str(e))"""
"""
from app.models import Admin
@app.before_first_request
def create_standard_admin():
    print("test")
    admin = Admin(mail="dev")
    admin.set_password("root")
    db.session.add(admin)
    db.session.commit()"""