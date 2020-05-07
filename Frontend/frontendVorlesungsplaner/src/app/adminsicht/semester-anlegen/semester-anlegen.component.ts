import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KursController } from '@app/controller/kurs-controller.service';
import { SemesterController } from '@app/controller/semester-controller.service';
import { Kurs } from '@app/models/kurse-models';
import { Semester } from '@app/models/semester-models';
import { BackendErrorResponse } from '@app/models/user';
import { SEMESTERNUMBERS } from '../../utils/constants';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'semester-anlegen',
  templateUrl: './semester-anlegen.component.html',
  styleUrls: ['./semester-anlegen.component.css'],
})

export class SemesteranlegenComponent {

  public formSemester: FormGroup;
  error = '';
  // Konstante
  public semesternummer = SEMESTERNUMBERS;

  public currentKurs: string;
  private kursListe: Kurs[];
  constructor(private fb: FormBuilder,
    private kursController: KursController,
    private semesterController: SemesterController,
    private toastService: ToastService
  ) {
    this.kursController.currentKurs.subscribe(kurs => {
      this.currentKurs = kurs;
      this.kursChanged();
    });

    this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
      this.kursListe = kurse;
      this.kursChanged();
    });
  }

  private kursChanged() {
    this.formSemester = this.fb.group({
      semesterData: this.fb.array([])
    });

    if (!this.kursListe || !this.currentKurs) {
      return;
    }

    const kurs = this.kursListe.find(kurs => {
      return kurs.name == this.currentKurs;
    });
    if (!kurs) {
      this.toastService.addError('Fehler aufgetreten, Kurs wurde nicht gefunden');
      return;
    }
    
    kurs.semester.sort((obj1, obj2) => {
      if (obj1.semesterID > obj2.semesterID) {
        return 1
      }
      if (obj1.semesterID < obj2.semesterID) {
        return -1
      }
      return 0;
    }
    )

    for (const semester of kurs.semester) {
      this.semesterData.push(
        this.fb.group({
          id: semester.id,
          semesterID: semester.semesterID,
          start: semester.start,
          ende: semester.ende
        } as Semester)
      );
    }
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
    } as Semester));
  }

  public async onSubmit() {
    const semesters: Semester[] = [];
    this.formSemester.value.semesterData.forEach(semester => {
      semesters.push(semester);
    });
    console.log(semesters);
    try {
      const response = await this.semesterController.saveSemester(this.currentKurs, semesters);
      this.toastService.addSuccess('Semester erfolgreich gespeichert');
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        const error = err.error as BackendErrorResponse;
        this.error = error.msg;
        this.toastService.addError(error.msg);
      } else {
        console.error(err);
        this.toastService.addError('Ein unbekannter Fehler ist aufgetreten');
      }
    }

  }

  public removeInput(index) {
    this.semesterData.removeAt(index);
  }

  public isSemesterNummerUsed(nr: number) {
    for (const semester of this.semesterData.value as Semester[]) {
      if (semester.semesterID == nr) {
        return true;
      }
    }
    return false;
  }
}
