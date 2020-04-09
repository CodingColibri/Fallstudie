import { Vorlesung } from './vorlesungen-models';

export class Dozent {
    titel: String;
    vorname: String;
    nachname: String;
    mail: String;
    //belegteVorlesungen: Vorlesung[]; //TODO: Macht das Sinn? Innerhalb der Vorlesung steht der Dozent

    constructor(titel: String, vorname: String, nachname: String, mail: String) {
      this.titel = titel;
      this.vorname = vorname;
      this.nachname = nachname;
      this.mail = mail;
    }
  }