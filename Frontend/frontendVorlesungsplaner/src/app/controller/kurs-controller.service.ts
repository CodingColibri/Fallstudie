import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { KursKlasse } from '@app/models/kurse-models';
import { Semester } from '@app/models/semester-models';

//INFO: KursController als zentrale Datenverwaltung

@Injectable({
  providedIn: "root"
})
export class KursController {
  private backendUrl = environment.apiUrl;
  public kursListe: BehaviorSubject<KursKlasse[]>;

  constructor(
    private httpClient: HttpClient,
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
      new KursKlasse("WWI2018A", 2018, [], "Prof. Dr. Wenger"),
      new KursKlasse("WWI2018E", 2018, [], "Prof. Dr. Vogt"),
      new KursKlasse("WWI2018H", 2018, [
        new Semester(2018, 1,new Date(2018,9,1),new Date(2018,11,23), []),
        new Semester(2018, 2,new Date(2019,2,18),new Date(2019,5,9), []),
        new Semester(2018, 3,new Date(2019,8,2),new Date(2019,10,24), []),
        new Semester(2018, 4,new Date(2020,1,17),new Date(2020,4,10), [])
      ], "Prof. Dr. Richter"),
      new KursKlasse("WWI2017H", 2017, [], "Prof. Dr. Richter"),
    ]

    let semester: Semester[] = [
      new Semester(2020, 1,new Date(2020,0,1),new Date(2020,3,1), []),
      new Semester(2020, 2,new Date(2020,3,1),new Date(2020,6,1), []),
    ]

    this.kursListe.next(temp); //pusht in Beh. Subject
    // this.kursListe.next(this.kursListe.getValue().concat([kurs.?]))
  }

  addKurs(kurs: KursKlasse) {
    //INFO: concat() to join to or more arrays
    this.kursListe.next(this.kursListe.getValue().concat([kurs]))
  }

}
