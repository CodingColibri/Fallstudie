import { Modul } from './module-models';
import { Studienjahrgang } from './studienjahrgang-models';
import { Vorlesung } from './vorlesungen-models';

export class Semester {
  id: number;
  studienjahr?: number;
  semesterID: number;
  start?: Date;
  ende?: Date;

  constructor(id: number, semesterID: number, start: Date, ende: Date) {
    this.id = id;
    this.semesterID = semesterID;
    this.start = start;
    this.ende = ende; }
}
export interface SemestersResponse {
  semesters: Semester[];
}

export interface SemesterRequestValues {
  id?: number;
  semesterID: number;
  start?: number;
  ende?: number;
}
export interface SemestersRequest {
  semesters: SemesterRequestValues[];
}
