import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kurs, KurseResponse, KursRequest, KursResponse } from '@app/models/kurse-models';
import { Semester, SemestersRequest, SemestersResponse } from '@app/models/semester-models';
import { LoginRequest, LoginResponse } from '@app/models/user';
import { environment } from '@environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Dozent, DozentenResponse, DozentenRequest, DozentRequest, DozentResponse } from '@app/models/dozenten-models';
import { Vorlesung, VorlesungResponse, VorlesungRequest } from '@app/models/vorlesungen-models';
import { Termin, TermineResponse, TermineRequest, TerminRequest } from '@app/models/termin-models';

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
      this.deserializeVorlesungen(vorlesung)
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
      studienjahr: kurs.studienjahr
    } as KursRequest;
    return await this.http.post<KursResponse>(`${this.endpoint}/kurs`, body).pipe(
      map(resp => {
        this.deserializeKurs(resp.kurs);
        return resp;
      })
    ).toPromise();
  }
  public async deleteKurs(kurs_name: string) {
    return await this.http.delete(`${this.endpoint}/kurs/${kurs_name}`).subscribe(data => {});
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
  /**********************************************
/* Dozenten Requests
/**********************************************/
  private deserializeDozenten(dozent: Dozent): Dozent {
    return dozent;
  }

  public async saveDozent(dozent: Dozent): Promise<DozentResponse> {
    const body = {
      titel: dozent.titel,
      vorname: dozent.vorname,
      nachname: dozent.nachname,
      mail: dozent.mail,
      role: dozent.role,
      password: dozent.password,
    } as DozentRequest;

    return await this.http.post<DozentResponse>(`${environment.backendUrl}/dozent`, body).pipe(
      map(resp => {
        this.deserializeDozenten(resp.dozent);
        return resp;
      })
    ).toPromise();
  }

  public async saveDozenten(dozenten: Dozent[]): Promise<DozentenResponse> {
    const body = {
      dozenten: []
    } as DozentenRequest;
    debugger
    for (const dozent of dozenten) {
      body.dozenten.push({
        titel: dozent.titel,
        vorname: dozent.vorname,
        nachname: dozent.nachname,
        mail: dozent.mail,
        role: dozent.role,
        password: dozent.password,
      });

      return await this.http.post<DozentenResponse>(`${environment.backendUrl}/dozenten`, body).pipe(
        map(resp => {
          console.log(resp);
          for (let dozent of resp.dozenten) {
            this.deserializeDozenten(dozent);
          }
          return resp;
        })
      ).toPromise();
    }
  }

  public async getDozenten(): Promise<DozentenResponse> {
    return await this.http.get<DozentenResponse>(`${environment.backendUrl}/dozent`).pipe(
      map(resp => {
        for (let dozent of resp.dozenten) {
          this.deserializeDozenten(dozent);
        }
        return resp;
      })
    ).toPromise();
  }
  public async deleteDozent(dozent_mail: string) {
    return await this.http.delete(`${this.endpoint}/dozent/${dozent_mail}`).subscribe(data => {});
  }

  /**********************************************
  /* Vorlesungen Requests
  /**********************************************/
  private deserializeVorlesungen(vorlesung: Vorlesung): Vorlesung {
    for (const termin of vorlesung.termine) {
      termin.startDate = new Date(termin.startDate as any * 1000);
      termin.endDate = new Date(termin.endDate as any * 1000);
      termin.vorlesungsID = vorlesung.id;
      if (termin.startDate < new Date(new Date(termin.startDate).setHours(12))) {
        termin.morningOrAfternoon = 'morning'
      } else {
        termin.morningOrAfternoon = 'afternoon'
      }

    }
    for (const dozent of vorlesung.dozenten) {
      this.deserializeDozenten(dozent);
    }
    return vorlesung;
  }

  public async saveVorlesungen(kurs_name: string, vorlesungen: Vorlesung[]): Promise<VorlesungResponse> {
    const body = {
      vorlesungen: []
    } as VorlesungRequest;
    for (const vorlesung of vorlesungen) {
      body.vorlesungen.push({
        name: vorlesung.name,
        std_anzahl: vorlesung.std_anzahl,
        dozenten: vorlesung.dozenten
      })
    }
    return await this.http.post<VorlesungResponse>(`${environment.backendUrl}/kurs/${kurs_name}/vorlesung`, body).toPromise();
  }

  public async getVorlesungenByKurs(kurs_name: string): Promise<VorlesungResponse> {
    return await this.http.get<VorlesungResponse>(`${environment.backendUrl}/kurs/${kurs_name}/vorlesungen`).pipe(
      map(resp => {
        for (let vorlesung of resp.vorlesungen) {
          this.deserializeVorlesungen(vorlesung);
        }
        return resp;
      })
    ).toPromise();
  }

  public async deleteVorlesung(vorlesung_id: number) {
    return await this.http.delete(`${this.endpoint}/vorlesung/${vorlesung_id}`).subscribe(data => {});
  }

  /**********************************************
  /* Termine Requests
  /**********************************************/
  //mitgetVorlesungenByKurs() die ID auslesen und hier mitgeben
  public async saveTermine(vorlesung_id: number, termine: Termin[]): Promise<TermineResponse> {
    const body = {
      termine: []
    } as TermineRequest;
    for (const termin of termine) {
      const obj = {
        endDate: termin.endDate.getTime() / 1000,
        startDate: termin.startDate.getTime() / 1000
      } as TerminRequest;
      if (termin.id) {
        obj.id = termin.id;
      }
      body.termine.push(obj);
    }

    return await this.http.post<TermineResponse>(`${environment.backendUrl}/vorlesung/${vorlesung_id}/termin`, body).toPromise();
  }

  public async deleteTermin(terminID: number) {
    return await this.http.delete(`${this.endpoint}/termin/${terminID}`).subscribe(data => {});
  }
}
