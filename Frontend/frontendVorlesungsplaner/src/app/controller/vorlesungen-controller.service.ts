import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { KursKlasse } from '@app/models/kurse-models';
import { Semester } from '@app/models/semester-models';
import { Studienjahrgang } from '@app/models/studienjahrgang-models';
import { Vorlesung } from '@app/models/vorlesungen-models';

@Injectable({
  providedIn: "root"
})
export class VorlesungenController {
  private backendUrl = environment.apiUrl;
  public vorlesungenListe: BehaviorSubject<Vorlesung[]>;

  constructor(
    private httpClient: HttpClient,
    // private vpnPeerAdapter: VPNPeerAdapter
  ) {
    this.vorlesungenListe = new BehaviorSubject<Vorlesung[]>(null);
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
    let temp: Vorlesung[] = [
        // new Vorlesung("Wirtschaftsinformatik",20),
        // new Vorlesung("Wirtschaftsinformatik",20),
    ];

    this.vorlesungenListe.next(temp); //pusht in Beh. Subject
  }

  addSemester(vorlesung: Vorlesung) {
    this.vorlesungenListe.next(this.vorlesungenListe.getValue().concat([vorlesung]))
  }

}