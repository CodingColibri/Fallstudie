import { Time } from '@angular/common';

export interface Modul {
    name: string;
    vorlesungen: Vorlesung[];
  } 

export interface Vorlesung {
    date?: Date;
    name?: String;
    stunden?: number; 
    /*TODO max.Stunden sollen aus der Funktion Admin-Vorlesung-anlegen genommen werden,
    & die aktuelle Stundenzahl der Vorlesung beim Eintragen soll dann immer abgeglichen werden.
    Ist die max. Stundenanzahl erreicht, kommt eine Warnmeldung.*/
    startDate?: Date;
    endDate?: Date;
    morningOrAfternoon?: String
    //TODO: Kurs übergeben (Frage: Wie mappt man den Kalender/ die Vorlesung zu genau dem Kurs?)
}