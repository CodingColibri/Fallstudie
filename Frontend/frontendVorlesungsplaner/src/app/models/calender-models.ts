import { Vorlesung } from './vorlesungen-models';
import { Termin } from './termin-models';

export class CalenderDay {
    public date: Date; //Startdatum mit Startuhrzeit
    public morning: Termin;
    public afternoon: Termin;
    public uneditable: boolean;
    //public vorlesung: Vorlesung[];
    //Array Vorlesungen
    constructor (date: Date){
        this.date = date;
        date = new Date()
        this.morning = {
            start: new Date(2020,1,1,9,),
            ende: new Date(2020,1,1,12,15),
            morningOrAfternoon: 'morning'
        };
        this.afternoon = {
            start: new Date(2020,1,1,13,15),
            ende: new Date(2020,1,1,16,30),
            morningOrAfternoon: 'afternoon'
        };
        // this.vorlesung = [];
    }
}

export interface CalenderData {
    weeks: Week[];
}
export interface Week {
    weeknumber: number;
    days: CalenderDay[];
}