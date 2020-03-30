import { Vorlesung } from './module-models';

export class CalenderDay {
    public date: Date; //Startdatum mit Startuhrzeit
    public morning: boolean;
    public afternoon: boolean;
    public uneditable: boolean;
    public vorlesung: Vorlesung[];
    //Array Vorlesungen
    constructor (date: Date, morning: boolean =false, afternoon: boolean =false, vorlesung: Vorlesung[]){
        this.date = date;
        this.morning = morning;
        this.afternoon = afternoon;
        this.vorlesung = [];
    }
}

export interface CalenderData {
    weeks: Week[];
}
export interface Week {
    weeknumber: number;
    days: CalenderDay[];
}