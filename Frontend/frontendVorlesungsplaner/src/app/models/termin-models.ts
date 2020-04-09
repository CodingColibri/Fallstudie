import { Dozent } from './dozenten-models';
import { Vorlesung } from './vorlesungen-models';

export class Termin {
    date?: Date;
    stunden?: number; //endDate-startDate //=> im Backend gespeichert
    /*TODO max.Stunden sollen aus der Funktion Admin-Vorlesung-anlegen genommen werden,
    & die aktuelle Stundenzahl der Vorlesung beim Eintragen soll dann immer abgeglichen werden.
    Ist die max. Stundenanzahl erreicht, kommt eine Warnmeldung.*/
    startDate?: Date; //=> wird vom Backend als Array übergeben [Jahr, Monat, Tag, Stunden, Minuten]
    endDate?: Date; //=> wird vom Backend als Array übergeben [Jahr, Monat, Tag, Stunden, Minuten]
    morningOrAfternoon?: String //=> im Backend gespeichert
    dozent?: Dozent[]; //=>TODO: Soll von Login übergeben werden
    vorlesung?: Vorlesung[];
    
    constructor(date: Date, stunden: number, startDate: Date, endDate: Date, morningOrAfternoon: String,
        dozent: Dozent[], vorlesung: Vorlesung[]) {
        this.stunden = stunden;
        this.startDate = startDate;
        this.endDate = endDate;
        this.morningOrAfternoon = morningOrAfternoon;
        this.dozent = dozent;
        this.vorlesung = vorlesung;
        }
}