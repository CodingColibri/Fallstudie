export class CalenderDay {
    public dayNumber: number;
    public morning: boolean;
    public afternoon: boolean;

    constructor (daynumber: number, morning: boolean =false, afternoon: boolean =false){
        this.dayNumber = daynumber;
        this.morning = morning;
        this.afternoon = afternoon;
    }
}

export interface CalenderData {
    weeks: Week[];
}
export interface Week {
    weeknumber: number;
    days: CalenderDay[];
}