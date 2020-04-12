import { Semester } from './semester-models';
import { Vorlesung } from './vorlesungen-models';

// export interface Kurs {
//   value: string;
//   viewValue: string;
//   } 

// export interface KursDTO {
//   name: string; 
//   year: number;
//   semester: Semester[]; //TODO: Macht das Sinn?
//   studiengangsleiter?: string;
// }

export interface Kurs {
  name: string; //=> im Backend gespeichert
  studienjahrgang: number; //=> nicht im Backend gespeichert
  semester: Semester[]; //=> nicht im Backend gespeichert
  studiengangsleiter: string; //=> im Backend gespeichert
  vorlesungen: Vorlesung[];
}

export interface KursResponse {
  kurs: Kurs;
}

export interface KurseResponse {
  kurse: Kurs[];
}

export interface KursRequest {
  name: string;
  studienjahrgang: number;
  studiengangsleiter: string;
}