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
@app.before_first_request
def create_admin_Vorlesung():
    try:
        db.create_all()
    except Exception as e:
        print("Fehler beim erstellen der Datenbank?")
    try:
        kurs = Kurs(name="admin", studienjahrgang=2018, studiengangsleiter="Richter")
        vorlesung = Vorlesung(id=1,std_anzahl=0,name="admin",kurs_name="admin")
        admin = Dozent(mail="dev",role="admin")
        admin.set_password("root")
        db.session.add(kurs)
        db.session.add(vorlesung)
        db.session.add(admin)
        vorlesung.dozenten.append(admin)
        db.session.commit()
    except Exception as e:
        db.session.close()
        print("Did not create Admin account", str(e))
"""
from app.models import Admin
@app.before_first_request
def create_standard_admin():
    print("test")
    admin = Admin(mail="dev")
    admin.set_password("root")
    db.session.add(admin)
    db.session.commit()"""