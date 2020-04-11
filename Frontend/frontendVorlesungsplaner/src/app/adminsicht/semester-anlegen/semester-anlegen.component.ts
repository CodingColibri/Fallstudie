import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, NgForm, FormGroup } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { Semester } from '@app/models/semester-models';
import { KursKlasse } from '@app/models/kurse-models';
import { Studienjahrgang } from '@app/models/studienjahrgang-models';
import { KursController } from '@app/controller/kurs-controller.service';
import { StudienjahrgangController } from '@app/controller/studienjahrgang-controller.service';
import { SemesterController } from '@app/controller/semester-controller.service';
import { SEMESTERNUMBERS } from '../../utils/constants';

@Component({
  selector: 'semester-anlegen',
  templateUrl: './semester-anlegen.component.html',
  styleUrls: ['./semester-anlegen.component.css'],

})

export class SemesteranlegenComponent {

  public formSemester: FormGroup;

  //Konstante
  public semesternummer = SEMESTERNUMBERS;

  public kurse: KursKlasse[] = [];
  public studienjahrgang: Studienjahrgang[] = [];

  constructor(private fb: FormBuilder,
    public kursController: KursController,
    public studienJgController: StudienjahrgangController,
    public semesterController: SemesterController
  ) {
    this.kursController.kursListe.subscribe((data: KursKlasse[]) => {
      this.kurse = data;
    });

    this.studienJgController.studienjahrListe.subscribe((data: Studienjahrgang[]) => {
      this.studienjahrgang = data;
    });

    this.semesterController.semesterListe.subscribe((semesters: Semester[]) => {
      this.formSemester = this.fb.group({
        semesterData: this.fb.array([])
      })

      if (semesters) {
        for (const semester of semesters) {
          this.semesterData.push(
            this.fb.group({
              studienjahrgang: semester.studienjahrgang,
              nummer: semester.nummer,
              startDate: semester.startDate,
              endDate: semester.endDate
            } as Semester)
          )
        }
      }
    });
  }

  public get semesterData(): FormArray {
    return this.formSemester.get('semesterData') as FormArray;
  }

  public addSemester() {
    this.semesterData.push(this.fb.group({
      studienjahrgang: undefined,
      nummer: undefined,
      startDate: undefined,
      endDate: undefined
    } as Semester))
  }

  public onSubmit() {
    
    const semesters: Semester[] = [];
    this.formSemester.value.semesterData.forEach(semester => {
      semesters.push(semester);
    });
    console.log(semesters);

    //TODO: Backend add overwrite all semesters
    //TODO: Daten aus Formular in den SemesterController schreiben + Backend Request
    //this.semesterController.addSemester(new Semester(???));
  }

  public removeInput(index) {
    this.semesterData.removeAt(index);
  }

  public isSemesterNummerUsed(nr: number) {
    for (let semester of this.semesterData.value as Semester[]) {
      console.log(semester);
      if (semester.nummer == nr) {
        return true;
      }
    }
    return false;
  }
}