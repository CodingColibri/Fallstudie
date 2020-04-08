import { Modul } from './module-models';
import { Studienjahrgang } from './studienjahrgang-models';

export class Semester {
  studienjahrgang?: number;
  nummer: number;
  startDate?: Date;
  endDate?: Date;
  modul?: Modul[];

  constructor(studienjahrgang: number, nummer: number, startDate: Date, endDate: Date, modul: Modul[]) {
    this.studienjahrgang = studienjahrgang;
    this.nummer = nummer;
    this.startDate = startDate;
    this.endDate = endDate;
    this.modul = modul;
}
}