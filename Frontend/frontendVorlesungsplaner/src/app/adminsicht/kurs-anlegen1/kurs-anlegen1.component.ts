import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Semester } from '../../models/semester-models';
import { KursAnlegenService } from '../../services/kurs-anlegen.service';

@Component({
  selector: 'kurs-anlegen1',
  templateUrl: './kurs-anlegen1.component.html',
  styleUrls: ['./kurs-anlegen1.component.css']
})


export class Kursanlegen1Component {

  semesterAuswahl: Semester[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 }
  ];

  formKurs: FormGroup;
  formVorlesungen: FormGroup;
  Kursname: string;
  Jahr: number;
  Semester: number;

  constructor(private fb: FormBuilder,
    public kursService: KursAnlegenService) {
    this.formKurs = fb.group({
      'Kursname': [null, Validators.required],
      'Jahr': [null, Validators.required],
      'Semester': [null, Validators.required]
    }),
      this.formVorlesungen = this.fb.group({
        vorlesungenStunden: this.fb.array([
        ])
      })
  }
  addInput() {
    const vlStunden = this.formVorlesungen.controls.vorlesungenStunden as FormArray;
    vlStunden.push(this.fb.group({
      Vorlesungstitel: '',
      StundenanzahlVl: '',
    }))
  }

  onSubmit(form: NgForm) {

    console.log(form);
    //TODO: Daten aus dem Formular in den kursService schreiben
    // let updateKursData = {
    //   name: form.value.Kursname,
    //   year: this.Jahr,
    //   semester: [
    //       { value: this.Semester, viewValue: this.Semester }
    //   ]
    //   }
    // this.kursService.kurs.push(updateKursData);
    // console.log(this.kursService)
  }

  removeInput(index) {
    this.formVorlesungen.controls.vorlesungenStunden["controls"].splice(index, 1)
  }

}