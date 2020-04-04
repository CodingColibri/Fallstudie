from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config.from_object(Config)
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
        #print(e)
    try:
        kurs = Kurs(name="admin")
        vorlesung = Vorlesung(id=1,std_anzahl=0,name="admin",kurs_name="admin")
        admin = Dozent(mail="dev")
        admin.set_password("root")
        db.session.add(kurs)
        db.session.add(vorlesung)
        db.session.add(admin)
        vorlesung.dozenten.append(admin)
        db.session.commit()
    except:
        db.session.close()
        print("Did not create Admin account")
"""
from app.models import Admin
@app.before_first_request
def create_standard_admin():
    print("test")
    admin = Admin(mail="dev")
    admin.set_password("root")
    db.session.add(admin)
    db.session.commit()
"""