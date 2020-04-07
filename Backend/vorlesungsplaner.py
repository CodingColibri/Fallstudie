from app import app, db
from app.models import Vorlesung, Termin, Dozent, Kurs, Semester



@app.shell_context_processor
def make_shell_context():
    return {'db': db} #Hier könnte man die Models exportieren 