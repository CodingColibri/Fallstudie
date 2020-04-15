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
  public currentKurs: BehaviorSubject<string>;

  constructor(
    private restService: RestService,
    private kursController: KursController
  ) {
    this.dozentenListe = new BehaviorSubject<Dozent[]>(null);
    this.currentKurs = new BehaviorSubject<string>(null);
  }

  public async saveDozenten(dozent: Dozent): Promise<DozentenResponse> {
    const response = await this.restService.saveDozenten(dozent);

    return response;
  }
}