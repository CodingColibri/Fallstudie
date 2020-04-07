import { Vorlesung } from './vorlesungen-models';

export class Dozenten {
    titel: String;
    vorname: String;
    nachname: String;
    mail: String;
    belegteVorlesungen: Vorlesung[];

    constructor(titel: String, vorname: String, nachname: String, mail: String, belegteVorlesungen: Vorlesung[]) {
      this.titel = titel;
      this.vorname = vorname;
      this.nachname = nachname;
      this.mail = mail;
      this.belegteVorlesungen = belegteVorlesungen;
    }
  }