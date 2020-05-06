import { Dozent } from './dozenten-models';
import { Vorlesung } from './vorlesungen-models';

export interface Termin {
    vorlesungName?: Vorlesung['name'];
    id?: number;
    startDate: Date;
    endDate: Date;
    morningOrAfternoon?: 'morning' | 'afternoon';
    vorlesungsID?: number;
}
export interface TerminValues {
    startDate: Date;
    endDate: Date;
}
export interface TerminRequest {
    id?: number;
    startDate: number;
    endDate: number;
}

export interface TermineRequest {
    termine: TerminRequest[];
}
export interface TermineResponse {
    termine: Termin[];
}
