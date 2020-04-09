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

  formSemester: FormGroup;
  Semesternummer: number;
  Semesterbeginn: Date;
  Semesterende: Date;

//Konstante
  semesternummer = SEMESTERNUMBERS;

  kurse: KursKlasse[]= [];
  studienjahrgang: Studienjahrgang[] = [];
  semester: Semester[]= [];

  constructor(private fb: FormBuilder,
    public kursController: KursController,
    public studienJgController: StudienjahrgangController,
    public semesterController: SemesterController) {
    this.kursController.kursListe.subscribe((data: KursKlasse[])=> {
      this.kurse = data;
    });
    this.studienJgController.studienjahrListe.subscribe((data: Studienjahrgang[])=> {
      this.studienjahrgang = data;
    });
    this.semesterController.semesterListe.subscribe((data: Semester[])=> {
      this.semester = data;
    });
    this.formSemester = this.fb.group({
      semesterData: this.fb.array([
      ])
    })
    this.kursController.loadData();
    this.studienJgController.loadData();
    this.semesterController.loadData();
  }

  addInput() {
    const semesterArray = this.formSemester.controls.semesterData as FormArray;
    semesterArray.push(this.fb.group({
      Studienjahrgang: '',
      Semesternummer: '',
      Semesterbeginn: '',
      Semesterende: ''
    }))
  }

  onSubmit(form: NgForm) {

    console.log(form);
    //TODO: Daten aus Formular in den SemesterController schreiben + Backend Request
    //this.semesterController.addSemester(new Semester(???));
  }

  removeInput(index) {
    this.formSemester.controls.semesterData["controls"].splice(index, 1)
  }
}