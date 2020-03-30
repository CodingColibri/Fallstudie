export interface Modul {
    name: string;
    vorlesungen: Vorlesung[];
  } 

export interface Vorlesung {
    name: string;
    stunden: number;
    // startDate: Date;
    // endDate: Date;
}