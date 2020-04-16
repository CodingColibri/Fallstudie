import { Dozent } from './dozenten-models';
import { Kurs } from './kurse-models';
import { Termin } from './termin-models';

export interface Vorlesung {
    //date?: Date; //Delete => ist in Termin (Kalender muss angepasst werden)
    id?: number;
    name?: String;
    maxStunden?: number;
    //stunden?: number; //Delete => ist in Termin (Kalender muss angepasst werden)
    //startDate?: Date; // Delete => ist in Termin (Kalender muss angepasst werden)
    //endDate?: Date; // Delete => ist in Termin (Kalender muss angepasst werden)
    //morningOrAfternoon?: String //Delete => ist in Termin (Kalender muss angepasst werden)
    kurs?: Kurs[];
    dozenten?: Dozent[];
    termine?: Termin[];

    // constructor(name: String, maxStunden: number, kurs: Kurs[], dozent: Dozent[]) {
    //     this.name = name;
    //     this.maxStunden = maxStunden;
    //     this.kurs = kurs
    //     this.dozent = dozent;
    //   }
}

export interface VorlesungResponse {
  vorlesungen: Vorlesung[];
}

export interface VorlesungRequestValues {
  name: String;
  maxStunden: number;
  dozenten: Dozent[];
}
export interface VorlesungRequest {
  vorlesungen: VorlesungRequestValues[];
}
