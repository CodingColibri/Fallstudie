import { Time } from '@angular/common';

export interface Modul {
    name: string;
    vorlesungen: Vorlesung[];
  } 

export interface Vorlesung {
    date?: Date;
    name?: String;
    stunden?: number;
    startDate?: Date;
    endDate?: Date;
    morningOrAfternoon?: String
    //TODO: Kurs übergeben
}