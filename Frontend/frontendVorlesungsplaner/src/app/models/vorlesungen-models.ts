import { Dozenten } from './dozenten-models';
import { KursKlasse } from './kurse-models';

export class Vorlesung {
    date?: Date;
    name?: String;
    maxStunden?: number;
    stunden?: number; //endDate-startDate
    /*TODO max.Stunden sollen aus der Funktion Admin-Vorlesung-anlegen genommen werden,
    & die aktuelle Stundenzahl der Vorlesung beim Eintragen soll dann immer abgeglichen werden.
    Ist die max. Stundenanzahl erreicht, kommt eine Warnmeldung.*/
    startDate?: Date;
    endDate?: Date;
    morningOrAfternoon?: String
    dozent?: Dozenten[];
    kurs?: KursKlasse[];
    //TODO: Kurs übergeben (Frage: Wie mappt man den Kalender/ die Vorlesung zu genau dem Kurs?)
    
//   constructor(name: String, maxStunden: number){
//     this.name = name;
//     this.maxStunden = maxStunden;
// }

}