import { Dozent } from './dozenten-models';
import { Vorlesung } from './vorlesungen-models';

export interface Termin {
    date?: Date;
    name?: Vorlesung["name"];
    stunden?: number; //endDate-startDate //=> im Backend gespeichert
    start: Date;
    ende: Date;
    morningOrAfternoon?: String
    dozent?: Dozent[]; //=>TODO Soll von Login übergeben werden
}
export interface TerminValues {
    start: Date;
    ende: Date;
}
export interface TermineRequest {
    termine: TerminValues[];
  }
export interface TermineResponse {
    termine: Termin[];
}

