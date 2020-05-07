import { Vorlesung } from './vorlesungen-models';
import { Termin } from './termin-models';

export interface CalenderDay {
    date: Date; // Startdatum mit Startuhrzeit
    morning: Termin;
    afternoon: Termin;
}

export interface CalenderData {
    weeks: Week[];
}
export interface Week {
    weeknumber: number;
    days: CalenderDay[];
}
