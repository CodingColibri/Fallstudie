import { Modul } from './module-models';
import { Studienjahrgang } from './studienjahrgang-models';
import { Vorlesung } from './vorlesungen-models';

export class Semester {
  studienjahrgang?: number; //=> nicht im Backend gespeichert
  nummer: number; //=> nicht im Backend gespeichert
  startDate?: Date; //=> im Backend gespeichert
  endDate?: Date; //=> im Backend gespeichert
  vorlesung?: Vorlesung[]; //=> nicht im Backend gespeichert

  constructor(studienjahrgang: number, nummer: number, startDate: Date, endDate: Date, vorlesung: Vorlesung[]) {
    this.studienjahrgang = studienjahrgang;
    this.nummer = nummer;
    this.startDate = startDate;
    this.endDate = endDate;
    this.vorlesung = vorlesung;
}
}