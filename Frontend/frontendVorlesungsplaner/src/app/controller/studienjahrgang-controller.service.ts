import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { KursKlasse } from '@app/models/kurse-models';
import { Semester } from '@app/models/semester-models';
import { Studienjahrgang } from '@app/models/studienjahrgang-models';

//INFO: KursController als zentrale Datenverwaltung

@Injectable({
  providedIn: "root"
})
export class StudienjahrgangController {
  private backendUrl = environment.apiUrl;
  public studienjahrListe: BehaviorSubject<Studienjahrgang[]>;

  constructor(
    private httpClient: HttpClient,
    // private vpnPeerAdapter: VPNPeerAdapter
  ) {
    this.studienjahrListe = new BehaviorSubject<Studienjahrgang[]>(null);
  }

  loadData() {
    //TODO: GET Request
    // const url = this.backendUrl + "vpn";
    // this.httpClient.get(url).subscribe((data: any[]) => {
    //   let vpnPeers: VPNPeer[] = data.map(item => {
    //     return this.vpnPeerAdapter.adapt(item);
    //   });
    //   this.kursListe.next(vpnPeers);
    // });
    let temp: Studienjahrgang[] = [
      new Studienjahrgang(2016),
      new Studienjahrgang(2017),
      new Studienjahrgang(2018),
      new Studienjahrgang(2019),
    ]

    this.studienjahrListe.next(temp); //pusht in Beh. Subject
  }

  addKurs(studienjahrgang: Studienjahrgang) {
    this.studienjahrListe.next(this.studienjahrListe.getValue().concat([studienjahrgang]))
  }

}