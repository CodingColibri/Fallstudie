import { Vorlesung } from './vorlesungen-models';
import { Termin } from './termin-models';

export interface CalenderDay {
    date: Date; //Startdatum mit Startuhrzeit
    morning: Termin;
    afternoon: Termin;
    //public vorlesung: Vorlesung[];
    //Array Vorlesungen
    // constructor (date: Date){
    //     this.date = date;
    //     date = new Date()
    //     this.morning = {
    //         startDate: new Date(2020,1,1,9,),
    //         endDate: new Date(2020,1,1,12,15),
    //         morningOrAfternoon: 'morning'
    //     };
    //     this.afternoon = {
    //         startDate: new Date(2020,1,1,13,15),
    //         endDate: new Date(2020,1,1,16,30),
    //         morningOrAfternoon: 'afternoon'
    //     };
    //     // this.vorlesung = [];
    // }
}

export interface CalenderData {
    weeks: Week[];
}
export interface Week {
    weeknumber: number;
    days: CalenderDay[];
}