import { Modul } from './module-models';

export class Semester {
  nummer: number;
  startDate?: Date;
  endDate?: Date;
  modul?: Modul[];

  constructor(nummer: number, startDate: Date, endDate: Date, modul: Modul[]) {
    this.nummer = nummer;
    this.startDate = startDate;
    this.endDate = endDate;
    this.modul = modul;
}
}