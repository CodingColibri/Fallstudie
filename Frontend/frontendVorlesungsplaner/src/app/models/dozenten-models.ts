import { Vorlesung } from './vorlesungen-models';

export interface Dozent {
    titel: string;
    vorname: string;
    nachname: string;
    mail: string;
    role: string;
    //belegteVorlesungen: Vorlesung[]; //TODO: Macht das Sinn? Innerhalb der Vorlesung steht der Dozent

  }
  export interface DozentenRequest {
    titel: string;
    vorname: string;
    nachname: string;
    mail: string;
    role: string;
  }

  export interface DozentenResponse {
    dozenten: Dozent[];
  }