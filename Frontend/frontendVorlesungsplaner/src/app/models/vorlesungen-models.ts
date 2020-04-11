import { Dozent } from './dozenten-models';
import { Kurs } from './kurse-models';
import { Termin } from './termin-models';

export class Vorlesung {
    //TODO: Überall Model Vorlesung + Termin anpassen! => + Controller übergeben
    date?: Date; //TODO: Delete => ist in Termin (Kalender muss angepasst werden)
    name?: String;
    maxStunden?: number;
    stunden?: number; //TODO: Delete => ist in Termin (Kalender muss angepasst werden)
    startDate?: Date; //TODO: Delete => ist in Termin (Kalender muss angepasst werden)
    endDate?: Date; //TODO: Delete => ist in Termin (Kalender muss angepasst werden)
    morningOrAfternoon?: String //TODO: Delete => ist in Termin (Kalender muss angepasst werden)
    kurs?: Kurs[];
    dozent?: Dozent[];
    termine?: Termin[];
    //TODO: Kurs übergeben => Neben Username, soll selected Kurs auf den Kalendereintrag gemappt werden

    constructor(name: String, maxStunden: number, kurs: Kurs[], dozent: Dozent[]) {
        this.name = name;
        this.maxStunden = maxStunden;
        this.kurs = kurs
        this.dozent = dozent;
      }
}