import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Kurs, KurseResponse, KursRequest } from '@app/models/kurse-models';
import { Semester, SemesterResponse } from '@app/models/semester-models';
import { BackendErrorResponse } from '@app/models/user';
import { map } from 'rxjs/operators';

//INFO: KursController als zentrale Datenverwaltung

@Injectable({
  providedIn: "root"
})
export class KursController {
  private backendUrl = environment.apiUrl;
  public kursListe: BehaviorSubject<Kurs[]>;
  public currentKurs: BehaviorSubject<string>;

  constructor(
    private http: HttpClient,
  ) {
    this.kursListe = new BehaviorSubject<Kurs[]>(null);
    this.currentKurs = new BehaviorSubject<string>(null); //=> Ausgewählter Kurs im Header
    this.currentKurs.next("admin"); //TODO: muss vom Backend noch gesetzt werden /kurse, dann Zeile löschen 
    this.currentKurs.subscribe(async (data: string) => {
      if (data) {
        try {
          console.log(data);
          const response = await this.http.get<KurseResponse>(`${environment.backendUrl}/kurs`).pipe(
            map(resp => {
              for (let kurs of resp.kurse) {
                for (const semester of kurs.semester) {
                  semester.start = new Date(semester.start as any * 1000);
                  semester.ende = new Date(semester.ende as any * 1000);
                }
                for (const vorlesung of kurs.vorlesungen) {
                  for (const termin of vorlesung.termine) {
                    termin.start = new Date(termin.start as any * 1000);
                    termin.ende = new Date(termin.ende as any * 1000);
                  }
                }
              }
              console.log(resp);
              return resp;
            })
          ).toPromise();
          console.log(response); //TODO: ?! Date-Response ist richtig, übergibt es jedoch als number
          this.kursListe.next(response.kurse);
          console.log(this.kursListe);
        } catch (err) {
          if (err instanceof HttpErrorResponse) {
            console.error(err);
            const error = err.error as BackendErrorResponse;
          } else {
            console.error("Unknown error occured");
            console.error(err);
          }
        }
      }
    });
  }

  async loadData() {
    if (!this.currentKurs.value) {
      return
    }
    const response = await this.http.get<KurseResponse>(`${environment.backendUrl}/kurs`).toPromise();
    this.kursListe.next(response.kurse);

    //TODO: Benny Backend Route /kurse muss noch angelegt werden
    // const getKurs = await this.http.get<Kurs>(`${environment.backendUrl}/kurse`).toPromise(); //=> /kurse gibt es noch nicht
  }

  addKurs(kurs: Kurs) {
    //INFO: concat() to join to or more arrays
    this.kursListe.next(this.kursListe.getValue().concat([kurs]))
  }

  //TODO:
  // async saveKurs(body: Kurs[]): Promise<KurseResponse> {
  //   const request = {
  //     kurse: []
  //   } as KursRequest
  //   for (const kurse of body) {
  //     request.kurse.push({

  //       id: kurse.id,
  //       semesterID: semester.semesterID,
  //       ende: semester.ende.getTime() / 1000,
  //       start: semester.start.getTime() / 1000,
  //     })
  //   }
  //   console.log(request);
  //   const sendSemester = await this.http.post<SemesterResponse>(`${environment.backendUrl}/kurs/${kurs_name}/semester`, request).toPromise();
  //   console.log("Semester anlegen: ", sendSemester)
  //   this.kursController.loadData();
  //   return sendSemester;
  // }

  public updateKurs(kurs: string) {
    this.currentKurs.next(kurs);
  }

}
