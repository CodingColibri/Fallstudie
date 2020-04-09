import { Dozent } from './dozenten-models';
import { KursKlasse } from './kurse-models';

export class Vorlesung {
    //TODO: Überall Model Vorlesung + Termin anpassen! => + Controller übergeben
    date?: Date; //TODO: Delete => ist in Termin
    name?: String;
    maxStunden?: number;
    stunden?: number; //TODO: Delete => ist in Termin
    startDate?: Date; //TODO: Delete => ist in Termin
    endDate?: Date; //TODO: Delete => ist in Termin
    morningOrAfternoon?: String //TODO: Delete => ist in Termin
    kurs?: KursKlasse[];
    dozent?: Dozent[];
    //TODO: Kurs übergeben => Neben Username, soll selected Kurs auf den Kalendereintrag gemappt werden

    constructor(name: String, maxStunden: number, kurs: KursKlasse[], dozent: Dozent[]) {
        this.name = name;
        this.maxStunden = maxStunden;
        this.kurs = kurs
        this.dozent = dozent;
      }
}