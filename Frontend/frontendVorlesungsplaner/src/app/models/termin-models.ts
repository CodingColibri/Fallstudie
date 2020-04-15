import { Dozent } from './dozenten-models';
import { Vorlesung } from './vorlesungen-models';

export interface Termin {
    date?: Date;
    name?: Vorlesung["name"]; //Nachfragen: Greift man so auf die Property "name" in Vorlesung zu?
    stunden?: number; //endDate-startDate //=> im Backend gespeichert
    start: Date;
    ende: Date;
    morningOrAfternoon?: String
    dozent?: Dozent[]; //=>TODO Soll von Login übergeben werden
}