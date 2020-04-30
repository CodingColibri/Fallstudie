import { Injectable } from '@angular/core';
import { Semester, SemestersResponse } from '@app/models/semester-models';
import { BehaviorSubject } from 'rxjs';
import { KursController } from './kurs-controller.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class SemesterController {
  public currentKurs: string = undefined;

  constructor(
    private restService: RestService,
    private kursController: KursController
  ) {
    this.kursController.currentKurs.subscribe(kurs => {
      if (kurs) {
        this.currentKurs = kurs;
      }
    });
  }

  public async saveSemester(kurs_name: string, semesters: Semester[]): Promise<SemestersResponse> {
    const response = await this.restService.saveSemesters(kurs_name, semesters);

    // Update Kurses
    this.kursController.loadData();
    return response;
  }
}
