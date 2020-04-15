import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Dozent, DozentenResponse } from '@app/models/dozenten-models';
import { RestService } from './rest.service';
import { KursController } from './kurs-controller.service';

@Injectable({
  providedIn: "root"
})
export class DozentenController {
  public dozentenListe: BehaviorSubject<Dozent[]>;
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
    this.dozentenListe = new BehaviorSubject<Dozent[]>(null);
  }

  public async saveDozenten(dozenten: Dozent[]): Promise<DozentenResponse> {
    const response = await this.restService.saveDozenten(dozenten);

    return response;
  }
}