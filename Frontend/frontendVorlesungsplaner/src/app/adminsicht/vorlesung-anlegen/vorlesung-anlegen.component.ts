import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Semester } from '../../models/semester-models';
import { KursAnlegenService } from '../../services/kurs-anlegen.service';
import { KursController } from '@app/controller/kurs-controller.service';
import { KursKlasse } from '@app/models/kurse-models';

@Component({
  selector: 'vorlesung-anlegen',
  templateUrl: './vorlesung-anlegen.component.html',
  styleUrls: ['./vorlesung-anlegen.component.css']
})


export class VorlesunganlegenComponent {

  kurse: KursKlasse[]= [];
  
  formKurs: FormGroup;
  formVorlesungen: FormGroup;
  Kursname: string;
  Jahr: number;
  Semester: number;

  constructor(private fb: FormBuilder,
    public kursController: KursController) {
      this.formVorlesungen = this.fb.group({
        vorlesungenStunden: this.fb.array([
        ])
      });
      this.kursController.kursListe.subscribe((data: KursKlasse[])=> {
        this.kurse = data;
      });
      this.kursController.loadData();
      
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
    console.log(form.name)
    // console.log(form.controls['Kursname'].value);
    // //TODO: Daten aus dem Formular in den kursService schreiben
    // // let updateKursData = {
    // //   name: form.controls['formKurs'].controls['Kursname']value,
    // //   year: form.controls['Jahr'].value,
    // //   semester: [
    // //       { value: this.Semester, viewValue: this.Semester }
    // //   ]
    // //   }
    // //   debugger;
    // this.kursService.kurs.push(form.value);
    console.log(this.kursController)
  }

  removeInput(index) {
    this.formVorlesungen.controls.vorlesungenStunden["controls"].splice(index, 1)
  }

}