import { Semester } from './semester-models';
import { Vorlesung } from './vorlesungen-models';

export interface Kurs {
  name: string; //=> im Backend gespeichert
  studienjahrgang: number; //=> nicht im Backend gespeichert
  semester: Semester[]; //=> nicht im Backend gespeichert
  studiengangsleiter: string; //=> im Backend gespeichert
  vorlesungen: Vorlesung[];
}

export interface KurseResponse {
  kurse: Kurs[];
}

export interface KursRequest {
  name: string;
  studienjahrgang: number;
  studiengangsleiter: string;
}