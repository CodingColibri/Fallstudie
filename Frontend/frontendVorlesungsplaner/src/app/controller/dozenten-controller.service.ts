import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Dozent, DozentenResponse, DozentResponse } from '@app/models/dozenten-models';
import { RestService } from './rest.service';
import { KursController } from './kurs-controller.service';

@Injectable({
  providedIn: "root"
})
export class DozentenController {
  public dozentenListe: BehaviorSubject<Dozent[]>;
  public currentKurs: BehaviorSubject<string>;

  constructor(
    private restService: RestService,
    private kursController: KursController
  ) {
    this.dozentenListe = new BehaviorSubject<Dozent[]>(null);
    this.currentKurs = new BehaviorSubject<string>(null);
  }

  public async loadData() {
    //TODO get request anpassen
    // const response = await this.restService.getDozenten();
    // this.dozentenListe.next(response.dozenten);
  }

  public async saveDozenten(dozenten: Dozent[]): Promise<DozentenResponse>{
    const response = await this.restService.saveDozenten(dozenten);
    this.dozentenListe.next(response.dozenten);
    console.log(response);
    return response;
  }

  public async saveDozent(dozent: Dozent) {
    const response = await this.restService.saveDozent(dozent);
    const dozentenListe = this.dozentenListe.getValue();
    dozentenListe.push(response.dozent);
    this.dozentenListe.next(dozentenListe);
    this.loadData();
  }

}