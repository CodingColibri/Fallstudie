import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kurs, KurseResponse, KursRequest, KursResponse } from '@app/models/kurse-models';
import { Semester, SemestersRequest, SemestersResponse } from '@app/models/semester-models';
import { LoginRequest, LoginResponse } from '@app/models/user';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private endpoint = `${environment.backendUrl}`;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient) { }

  /**********************************************
  /* User Requests
  /**********************************************/
  public async login(body: LoginRequest): Promise<LoginResponse> {
    return await this.http.post<LoginResponse>(`${this.endpoint}/login`, body).toPromise();
  }

  /**********************************************
  /* Kurs Requests
  /**********************************************/
  private deserializeKurs(kurs: Kurs): Kurs {
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
    return kurs;
  }

  public async getKurse(): Promise<KurseResponse> {
    return await this.http.get<KurseResponse>(`${this.endpoint}/kurs`).pipe(
      map(resp => {
        for (let kurs of resp.kurse) {
          this.deserializeKurs(kurs);
        }
        return resp;
      })
    ).toPromise();
  }

  public async getKurs(kurs: string): Promise<KursResponse> {
    return await this.http.get<KursResponse>(`${this.endpoint}/kurs/${kurs}`).pipe(
      map(resp => {
        this.deserializeKurs(resp.kurs);
        return resp;
      })
    ).toPromise();
  }

  public async createKurs(kurs: Kurs): Promise<KursResponse> {
    const body = {
      name: kurs.name,
      studiengangsleiter: kurs.studiengangsleiter,
      studienjahrgang: kurs.studienjahrgang
    } as KursRequest;
    return await this.http.post<KursResponse>(`${this.endpoint}/kurs`, body).pipe(
      map(resp => {
        this.deserializeKurs(resp.kurs);
        return resp;
      })
    ).toPromise();
  }

  /**********************************************
  /* Semester Requests
  /**********************************************/
  public async saveSemesters(kurs_name: string, semesters: Semester[]): Promise<SemestersResponse> {
    const body = {
      semesters: []
    } as SemestersRequest;
    for (const semester of semesters) {
      body.semesters.push({
        id: semester.id,
        semesterID: semester.semesterID,
        ende: semester.ende.getTime() / 1000,
        start: semester.start.getTime() / 1000,
      })
    }
    return await this.http.post<SemestersResponse>(`${environment.backendUrl}/kurs/${kurs_name}/semester`, body).toPromise();
  }
}
