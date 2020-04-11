import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Semester, SemesterResponse, SemesterRequest } from '@app/models/semester-models';
import { KursController } from './kurs-controller.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: "root"
})
export class SemesterController {
  private backendUrl = environment.apiUrl;
  public semesterListe: BehaviorSubject<Semester[]>;
  public currentKurs: string = "admin"; //undefined

  constructor(
    private http: HttpClient,
    private kursController: KursController
  ) {
    this.kursController.currentKurs.subscribe(async (data: string) => {
      if (data) {
        console.log("test-semester-controller");
        this.currentKurs = data;
      }
    });
  }

  async saveSemester(kurs_name: string, body: Semester[]): Promise<SemesterResponse> {
    const request = {
      semesters: []
    } as SemesterRequest
    for (const semester of body) {
      request.semesters.push({
        id: semester.id,
        semesterID: semester.semesterID,
        ende: semester.ende.getTime() / 1000,
        start: semester.start.getTime() / 1000,
      })
    }
    console.log(request);
    const sendSemester = await this.http.post<SemesterResponse>(`${environment.backendUrl}/kurs/${kurs_name}/semester`, request).toPromise();
    console.log("Semester anlegen: ", sendSemester)
    this.kursController.loadData();
    return sendSemester;

  }

}