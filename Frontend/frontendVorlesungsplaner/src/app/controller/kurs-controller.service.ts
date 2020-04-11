import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Kurs, KurseResponse } from '@app/models/kurse-models';
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
    this.currentKurs = new BehaviorSubject<string>(null);
    this.currentKurs.next("admin"); //TODO: muss vom Backend noch gesetzt werden /kurse, dann Zeile löschen 
    this.currentKurs.subscribe(async (data: string) => {

      if (data) {
        try {
          console.log("test");
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
  public updateKurs(kurs: string) {
    this.currentKurs.next(kurs);
  }

}
