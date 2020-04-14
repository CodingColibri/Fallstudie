import { Vorlesung } from './vorlesungen-models';

export interface Dozent {
    titel: String;
    vorname: String;
    nachname: String;
    mail: String;
    role: String;
    //belegteVorlesungen: Vorlesung[]; //TODO: Macht das Sinn? Innerhalb der Vorlesung steht der Dozent

  }
  export interface DozentenRequestValues {
    titel: String;
    vorname: String;
    nachname: String;
    mail: String;
    role: String;
  }
  export interface DozentenRequest {
    dozenten: DozentenRequestValues[];
  }
  export interface DozentenResponse {
    dozenten: Dozent[];
  }