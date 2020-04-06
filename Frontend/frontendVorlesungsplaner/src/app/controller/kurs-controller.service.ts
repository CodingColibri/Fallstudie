import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
// import { VPNPeer, VPNPeerAdapter } from "../models/VPN";
import { HttpClient } from "@angular/common/http";
import { KursKlasse } from '@app/models/kurse-models';

@Injectable({
  providedIn: "root"
})
export class KursController {
  private backendUrl = environment.apiUrl;
  public kursListe: BehaviorSubject<KursKlasse[]>;

  constructor(
    private httpClient: HttpClient,
    // private vpnPeerAdapter: VPNPeerAdapter
  ) {
    this.kursListe = new BehaviorSubject<KursKlasse[]>(null);
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
    let temp: KursKlasse[] = [
        new KursKlasse("WWI2018H", 2018, [], "Prof. Dr. Richter"),
        new KursKlasse("WWI2018A", 2018, [], "Prof. Dr. Wenger"),
    ]
    this.kursListe.next(temp); //pusht in Beh. Subject
  }

  addKurs(kurs: KursKlasse) {
      this.kursListe.next(this.kursListe.getValue().concat([kurs]))
  }

}
