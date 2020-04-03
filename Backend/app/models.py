from app import db
from flask_bcrypt import generate_password_hash, check_password_hash

association_table = db.Table('gibt', db.Model.metadata,
    db.Column('dozent_mail', db.String(128), db.ForeignKey('dozent.mail')),
    db.Column('vorlesung_id', db.Integer, db.ForeignKey('vorlesung.id'))
)

class Vorlesung(db.Model):
    __tablename__ = 'vorlesung'

    id = db.Column(db.Integer, primary_key=True)
    std_anzahl = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(128), nullable=False)
    
    kurs_name = db.Column(db.String(32), db.ForeignKey('kurs.name'),nullable=False)

    dozenten = db.relationship("Dozent", secondary=association_table, backref=db.backref('vorlesungen', lazy='dynamic'))
    termine = db.relationship("Termin", backref="vorlesung")

class Termin(db.Model):
    __tablename__ = 'termin'

    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.DateTime, nullable=False)
    ende = db.Column(db.DateTime, nullable=False)
    vorlesung_id = db.Column(db.Integer, db.ForeignKey('vorlesung.id'), nullable=False)

    #vorlesung = db.relationship("Vorlesung", backref="termin")

class Kurs(db.Model):
    __tablename__='kurs'

    name = db.Column(db.String(32), primary_key=True)
    
    semester = db.relationship('Semester', back_populates="kurs")
    vorlesungen = db.relationship('Vorlesung', backref="kurs")

class Dozent(db.Model):
    __tablename__='dozent'

    mail = db.Column(db.String(128), primary_key=True)
    titel = db.Column(db.String(32))
    vorname = db.Column(db.String(32))
    nachname = db.Column(db.String(32))
    password_hash = db.Column(db.String(128))

    #vorlesungen = db.relationship("Vorlesung", secondary=association_table, backref=db.backref('dozenten') 

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Semester(db.Model):
    __tablename__='semester'

    start = db.Column(db.Date, nullable=False)
    ende = db.Column(db.Date, nullable=False)
    name = db.Column(db.Integer, nullable=False, primary_key=True)
    kurs_name = db.Column(db.String(32), db.ForeignKey('kurs.name'), primary_key=True)

    kurs = db.relationship("Kurs", back_populates="semester")

