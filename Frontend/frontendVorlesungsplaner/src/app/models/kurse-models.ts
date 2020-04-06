import { Semester } from './semester-models';

export interface Kurs {
  value: string;
  viewValue: string;
  } 

export interface KursDTO {
  name: string; 
  year: number;
  semester: Semester[]; //TODO: Macht das Sinn?
  studiengangsleiter?: string;
}

export class KursKlasse {
  name: String;
  year: number;
  semester: Semester [];
  studiengangsleiter: String;
  constructor(name: String, year: number, semester: Semester[], studiengangsleiter: String) {
    this.name = name;
    this.year = year;
    this.semester = semester;
    this.studiengangsleiter = studiengangsleiter;
  }
}