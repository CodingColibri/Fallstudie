import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, NgForm, FormGroup } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { Semester, SemesterResponse } from '@app/models/semester-models';
import { Kurs } from '@app/models/kurse-models';
import { Studienjahrgang } from '@app/models/studienjahrgang-models';

import { KursController } from '@app/controller/kurs-controller.service';
import { StudienjahrgangController } from '@app/controller/studienjahrgang-controller.service';
import { SemesterController } from '@app/controller/semester-controller.service';
import { SEMESTERNUMBERS } from '../../utils/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrorResponse } from '@app/models/user';

@Component({
  selector: 'semester-anlegen',
  templateUrl: './semester-anlegen.component.html',
  styleUrls: ['./semester-anlegen.component.css'],

})

export class SemesteranlegenComponent {

  public formSemester: FormGroup;
  error = '';
  //Konstante
  public semesternummer = SEMESTERNUMBERS;

  public currentKurs: string;
  constructor(private fb: FormBuilder,
    public kursController: KursController,
    public semesterController: SemesterController,
    private router: Router,
  ) {
    this.kursController.currentKurs.subscribe((data: string) => {
      this.currentKurs = data;
    });

    this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
      this.formSemester = this.fb.group({
        semesterData: this.fb.array([])
      })

      console.log(kurse);
      if (!kurse) {
        return;
      }

      kurse = kurse.filter(kurs => {
        return kurs.name == this.currentKurs;
      });
      const kurs = kurse[0];
      for (const semester of kurs.semester) {
        console.log(semester);
        this.semesterData.push(
          this.fb.group({
            id: semester.id,
            semesterID: semester.semesterID,
            start: semester.start,
            ende: semester.ende
          } as Semester)
        )
      }
    });
  }

  public get semesterData(): FormArray {
    return this.formSemester.get('semesterData') as FormArray;
  }

  public addSemester() {
    this.semesterData.push(this.fb.group({
      id: undefined,
      semesterID: undefined,
      start: undefined,
      ende: undefined
    } as Semester))
  }

  public async onSubmit() {

    const semesters: Semester[] = [];
    this.formSemester.value.semesterData.forEach(semester => {
      semesters.push(semester);
    });
    console.log(semesters);

    try {
      const kurs_name = this.currentKurs;
      const response = await this.semesterController.saveSemester(kurs_name, semesters);
      console.log("Daten wurden erfolgreich gesendet");
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        const error = err.error as BackendErrorResponse;
        this.error = error.msg;
      } else {
        console.error("Unknown error occured");
        console.error(err);
      }
    }

    //TODO: Backend add overwrite all semesters
    //TODO: Daten aus Formular in den SemesterController schreiben + Backend Request
    //this.semesterController.addSemester(new Semester(???));
  }

  public removeInput(index) {
    this.semesterData.removeAt(index);
  }

  public isSemesterNummerUsed(nr: number) {
    for (let semester of this.semesterData.value as Semester[]) {
      if (semester.semesterID == nr) {
        return true;
      }
    }
    return false;
  }
}