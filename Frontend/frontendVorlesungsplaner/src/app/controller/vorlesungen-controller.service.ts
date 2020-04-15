import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Vorlesung, VorlesungResponse } from '@app/models/vorlesungen-models';
import { RestService } from './rest.service';
import { KursController } from './kurs-controller.service';

@Injectable({
  providedIn: "root"
})
export class VorlesungenController {
  public vorlesungenListe: BehaviorSubject<Vorlesung[]>;
  public currentKurs: string = undefined;

  constructor(
    private restService: RestService,
    private kursController: KursController
  ) {
    this.kursController.currentKurs.subscribe(kurs => {
      if (kurs) {
        this.currentKurs = kurs;
      }
    });
    this.vorlesungenListe = new BehaviorSubject<Vorlesung[]>(null);
  }

  loadData() {
    let temp: Vorlesung[] = [
        // new Vorlesung("Wirtschaftsinformatik",20),
        // new Vorlesung("Wirtschaftsinformatik",20),
    ];
    this.vorlesungenListe.next(temp); //pusht in Beh. Subject
  }

  addSemester(vorlesung: Vorlesung) {
    this.vorlesungenListe.next(this.vorlesungenListe.getValue().concat([vorlesung]))
  }

  public async saveVorlesungen(kurs_name: string, vorlesungen: Vorlesung[]): Promise<VorlesungResponse> {
    const response = await this.restService.saveVorlesungen(kurs_name, vorlesungen);
    
    // Update Kurses
    this.kursController.loadData();
    return response;
  }

}