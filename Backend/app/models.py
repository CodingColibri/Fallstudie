from app import db
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import timedelta, date, datetime

association_table = db.Table('gibt', db.Model.metadata,
    db.Column('dozent_mail', db.String(128), db.ForeignKey('dozent.mail')),
    db.Column('vorlesung_id', db.Integer, db.ForeignKey('vorlesung.id'))
)

class Vorlesung(db.Model):
    __tablename__ = 'vorlesung'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    std_anzahl = db.Column(db.Integer, nullable=False)
    
    kurs_name = db.Column(db.String(32), db.ForeignKey('kurs.name'),nullable=False)

    dozenten = db.relationship("Dozent", secondary=association_table, backref=db.backref('vorlesungen', lazy='dynamic'))
    termine = db.relationship("Termin", backref="vorlesung")

    def to_public(self):
        out = {}
        out['id'] = self.id
        out['name'] = self.name
        out['std_anzahl'] = self.std_anzahl
        # out['kurs_name'] = self.kurs_name

        dozenten = []
        for dozent in self.dozenten:
            dozenten.append(dozent.to_public())
        out['dozenten'] = dozenten

        termine = []
        for termin in self.termine:
            termine.append(termin.to_public())
        out['termine'] = termine

        return out

class Termin(db.Model):
    __tablename__ = 'termin'

    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.DateTime, nullable=False)
    ende = db.Column(db.DateTime, nullable=False)
    vorlesung_id = db.Column(db.Integer, db.ForeignKey('vorlesung.id'), nullable=False)

    #vorlesung = db.relationship("Vorlesung", backref="termin")

    def to_public(self):
        out = {}
        out['id'] = self.id
        out['start'] = self.start.timestamp()
        out['ende'] = self.ende.timestamp()
        return out

class Kurs(db.Model):
    __tablename__='kurs'

    name = db.Column(db.String(32), primary_key=True)
    studiengangsleiter = db.Column(db.String(128))
    
    semester = db.relationship('Semester', back_populates="kurs")
    vorlesungen = db.relationship('Vorlesung', backref="kurs")

    def to_public(self):
        out = {}
        out['name'] = self.name
        out['studiengangsleiter'] = self.studiengangsleiter
        
        vorlesungen = []
        for vorlesung in self.vorlesungen:
            vorlesungen.append(vorlesung.to_public())
        out['vorlesungen'] = vorlesungen

        semester_out = []
        for semester in self.semester:
            semester_out.append(semester.to_public())
        out['semester'] = semester_out
        
        return out

class Dozent(db.Model):
    __tablename__='dozent'

    mail = db.Column(db.String(128), primary_key=True)
    titel = db.Column(db.String(32))
    vorname = db.Column(db.String(32))
    nachname = db.Column(db.String(32))
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(32))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_public(self):
        out = {}
        out['mail'] = self.mail
        out['titel'] = self.titel
        out['vorname'] = self.vorname
        out['nachname'] = self.nachname
        out['role'] = self.role
        return out

class Semester(db.Model):
    __tablename__='semester'

    id = db.Column(db.Integer, primary_key=True)
    semesterID = db.Column(db.Integer, nullable=False)
    start = db.Column(db.Date, nullable=False)
    ende = db.Column(db.Date, nullable=False)
    kurs_name = db.Column(db.String(32), db.ForeignKey('kurs.name'))

    kurs = db.relationship("Kurs", back_populates="semester")

    def to_public(self):
        out = {}
        out['id'] = self.id
        out['semesterID'] = self.semesterID
        # Invalid argument is thrown when date is prior 01.01.1970
        out['start'] = datetime.combine(self.start, datetime.min.time()).timestamp()
        out['ende'] = datetime.combine(self.ende, datetime.min.time()).timestamp()
        out['kurs_name'] = self.kurs_name
        return out