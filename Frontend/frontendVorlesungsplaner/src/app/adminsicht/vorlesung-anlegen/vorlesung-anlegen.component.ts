import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { KursController } from '@app/controller/kurs-controller.service';
import { KursKlasse } from '@app/models/kurse-models';
import { Dozent } from '@app/models/dozenten-models';
import { DozentenController } from '@app/controller/dozenten-controller.service';
import { DozentenKalenderComponent } from '@app/dozentensicht/dozentenkalender/dozentenkalender.component';

@Component({
  selector: 'vorlesung-anlegen',
  templateUrl: './vorlesung-anlegen.component.html',
  styleUrls: ['./vorlesung-anlegen.component.css']
})


export class VorlesunganlegenComponent {

  kurse: KursKlasse[]= [];
  dozent: Dozent[]= [];
  
  formKurs: FormGroup;
  formVorlesungen: FormGroup;
  Kursname: string;
  Jahr: number;
  Semester: number;
  DozentVl: string;

  constructor(private fb: FormBuilder,
    public kursController: KursController,
    public dozentenController: DozentenController) {
      this.formVorlesungen = this.fb.group({
        vorlesungenStunden: this.fb.array([
        ])
      });
      this.kursController.kursListe.subscribe((data: KursKlasse[])=> {
        this.kurse = data;
      });
      this.dozentenController.dozentenListe.subscribe((data: Dozent[])=> {
        this.dozent = data;
      });
      this.kursController.loadData();
      this.dozentenController.loadData();
      
  }

  addInput() {
    const vlStunden = this.formVorlesungen.controls.vorlesungenStunden as FormArray;
    vlStunden.push(this.fb.group({
      Vorlesungstitel: '',
      StundenanzahlVl: '',
      DozentVl: ''
    }))
  }

  onSubmit(form: NgForm) {
    console.log(form);

    // //TODO: Daten aus dem Formular in den kursController schreiben
    console.log(this.kursController)
  }

  removeInput(index) {
    this.formVorlesungen.controls.vorlesungenStunden["controls"].splice(index, 1)
  }

}