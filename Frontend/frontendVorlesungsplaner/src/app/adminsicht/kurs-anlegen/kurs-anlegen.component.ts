import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Semester } from '../../models/semester-models';
import { KursAnlegenService } from '../../services/kurs-anlegen.service';
import { KursController } from '@app/controller/kurs-controller.service';
import { KursKlasse } from '@app/models/kurse-models';

@Component({
  selector: 'kurs-anlegen',
  templateUrl: './kurs-anlegen.component.html',
  styleUrls: ['./kurs-anlegen.component.css']
})


export class KursanlegenComponent {

  formKurs: FormGroup;
  formVorlesungen: FormGroup;
  Kursname: string;
  Jahr: number;
  Semester: number;
  Studiengangsleiter: string;

  kurse: KursKlasse[]= [];

  constructor(private fb: FormBuilder,
    public kursController: KursController) {
    this.formKurs = this.fb.group({
      kursData: this.fb.array([
      ])
    });
      this.kursController.kursListe.subscribe((data: KursKlasse[]) => {
        this.kurse = data;
      });
      this.kursController.loadData();
  }

  addInput() {
    const vlStunden = this.formKurs.controls.kursData as FormArray;
    vlStunden.push(this.fb.group({
      Kursname: '',
      Jahr: '',
      Studiengangsleiter: ''
    }))
  }

  onSubmit(form: NgForm) {

    console.log(form);
    //console.log(form.controls['Kursname'].value);
    //TODO: Daten aus dem Formular in den kursController schreiben + Request an das Backend
    //TODO: Update Funktion addKurs() in kursController

    // console.log(this.kursController)
    // this.kursController.addKurs(new KursKlasse("WWI2016X", 2020, [], "test"));
  }

  removeInput(index) {
    this.formKurs.controls.kursData["controls"].splice(index, 1)
  }

}