import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Termin } from '@app/models/termin-models';

@Injectable({
  providedIn: "root"
})
export class TerminController {
  private backendUrl = environment.apiUrl;
  public terminListe: BehaviorSubject<Termin[]>;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.terminListe = new BehaviorSubject<Termin[]>(null);
  }

  loadData() {
    // let temp: Termin[] = [
    //     new Termin(new Date(2020, 3, 2),3,new Date(2020,3,3,9,0),new Date(2020,3,3,12,15),'morning',
    //     [],[]), 
    //     new Termin(new Date(2020, 3, 24),3,new Date(2020,3,4,13,15),new Date(2020,3,24,16,30),'afternoon',
    //     [],[]), 
    // ];
    // this.terminListe.next(temp); //pusht in Beh. Subject
  }

  addTermin(termin: Termin) {
    this.terminListe.next(this.terminListe.getValue().concat([termin]))
  }
}