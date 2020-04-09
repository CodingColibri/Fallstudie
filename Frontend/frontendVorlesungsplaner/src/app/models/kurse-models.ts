import { Semester } from './semester-models';

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

export class KursKlasse {
  name: String; //=> im Backend gespeichert
  studienjahrgang: number; //=> nicht im Backend gespeichert
  semester: Semester []; //=> nicht im Backend gespeichert
  studiengangsleiter: String; //=> im Backend gespeichert
  
  constructor(name: String, studienjahrgang: number, semester: Semester[], studiengangsleiter: String) {
    this.name = name;
    this.studienjahrgang = studienjahrgang;
    this.semester = semester;
    this.studiengangsleiter = studiengangsleiter;
  }
}