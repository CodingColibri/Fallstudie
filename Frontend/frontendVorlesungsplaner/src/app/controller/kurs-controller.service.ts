import { Injectable } from "@angular/core";
import { Kurs } from '@app/models/kurse-models';
import { BehaviorSubject } from "rxjs";
import { RestService } from './rest.service';

//INFO: KursController als zentrale Datenverwaltung

@Injectable({
  providedIn: "root"
})
export class KursController {
  public kursListe: BehaviorSubject<Kurs[]>;
  public currentKurs: BehaviorSubject<string>;

  constructor(
    private restService: RestService,
  ) {
    this.kursListe = new BehaviorSubject<Kurs[]>(null);
    this.currentKurs = new BehaviorSubject<string>(null);
  }

  public async loadData() {
    const response = await this.restService.getKurse();
    this.kursListe.next(response.kurse);
  }

  public async createKurs(kurs: Kurs) {
    const response = await this.restService.createKurs(kurs);
      
    const kursListe = this.kursListe.getValue();
    kursListe.push(response.kurs);
    this.kursListe.next(kursListe);
  }
  
  public setCurrentKurs(kurs: string) {
    this.currentKurs.next(kurs);
  }
}