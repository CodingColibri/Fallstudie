import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, NgForm, FormGroup } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { Semester } from '@app/models/semester-models';

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

  semester: Semester[] = [
    { nummer: 1 },
    { nummer: 2 },
    { nummer: 3 },
    { nummer: 4 },
    { nummer: 5 },
    { nummer: 6 }
  ];

  constructor(private fb: FormBuilder) {
    this.formSemester = this.fb.group({
      semesterData: this.fb.array([
      ])
    })
  }
  addInput() {
    const semesterArray = this.formSemester.controls.semesterData as FormArray;
    semesterArray.push(this.fb.group({
      Semesternummer: '',
      Semesterbeginn: '',
      Semesterende: ''
    }))
  }

  onSubmit(form: NgForm) {

    console.log(form);
  }

  removeInput(index) {
    this.formSemester.controls.semesterData["controls"].splice(index, 1)
  }

}