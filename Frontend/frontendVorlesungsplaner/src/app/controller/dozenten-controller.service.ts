import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Dozent } from '@app/models/dozenten-models';

@Injectable({
  providedIn: "root"
})
export class DozentenController {
  private backendUrl = environment.apiUrl;
  public dozentenListe: BehaviorSubject<Dozent[]>;

  constructor(
    private httpClient: HttpClient,
    // private vpnPeerAdapter: VPNPeerAdapter
  ) {
    this.dozentenListe = new BehaviorSubject<Dozent[]>(null);
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
    let temp: Dozent[] = [
        new Dozent("Prof. Dr. ","Sebastian","Richter","sebastian.richter@dhbw.de"),
        new Dozent("Prof. Dr. ","Raymond","Bimazubute","raymond.bimazubute@dhbw.de")
    ];

    this.dozentenListe.next(temp);
  }

  addDozent(dozent: Dozent) {
    this.dozentenListe.next(this.dozentenListe.getValue().concat([dozent]))
  }

}