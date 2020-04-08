import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Semester } from '@app/models/semester-models';

@Injectable({
  providedIn: "root"
})
export class SemesterController {
  private backendUrl = environment.apiUrl;
  public semesterListe: BehaviorSubject<Semester[]>;

  constructor(
    private httpClient: HttpClient,
    // private vpnPeerAdapter: VPNPeerAdapter
  ) {
    this.semesterListe = new BehaviorSubject<Semester[]>(null);
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
    let temp: Semester[] = [
        new Semester(2018, 1,new Date(2018,9,1),new Date(2018,11,23), []),
        new Semester(2018, 2,new Date(2019,2,18),new Date(2019,5,9), [])
    ];

    this.semesterListe.next(temp);
  }

  addSemester(semester: Semester) {
    this.semesterListe.next(this.semesterListe.getValue().concat([semester]))
  }

}