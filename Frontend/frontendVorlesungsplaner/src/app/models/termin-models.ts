import { Dozent } from './dozenten-models';
import { Vorlesung } from './vorlesungen-models';

export interface Termin {
    date?: Date;
    startDate: Date;
    endDate: Date;
    morningOrAfternoon?: String
    vorlesungsID?: number;
}
export interface TerminValues {
    startDate: Date;
    endDate: Date;
}
export interface TermineRequest {
    termine: TerminValues[];
  }
export interface TermineResponse {
    termine: Termin[];
}
