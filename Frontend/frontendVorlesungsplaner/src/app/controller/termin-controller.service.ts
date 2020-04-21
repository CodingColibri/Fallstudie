import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Termin, TermineResponse } from '@app/models/termin-models';
import { RestService } from './rest.service';
import { KursController } from './kurs-controller.service';

@Injectable({
  providedIn: "root"
})
export class TerminController {
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
  }

  public async saveTermine(vorlesung_id: number, termine: Termin[]): Promise<TermineResponse> {
    const response = await this.restService.saveTermine(vorlesung_id, termine);
    
    // Update Kurses
    this.kursController.loadData();
    return response;
  }
}