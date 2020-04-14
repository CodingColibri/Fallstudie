import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { KursController } from '@app/controller/kurs-controller.service';
import { Kurs } from '@app/models/kurse-models';
import { Dozent } from '@app/models/dozenten-models';
import { DozentenController } from '@app/controller/dozenten-controller.service';
import { DozentenKalenderComponent } from '@app/dozentensicht/dozentenkalender/dozentenkalender.component';
import { ToastService } from '@app/services/toast.service';
import { Vorlesung } from '@app/models/vorlesungen-models';

@Component({
  selector: 'vorlesung-anlegen',
  templateUrl: './vorlesung-anlegen.component.html',
  styleUrls: ['./vorlesung-anlegen.component.css']
})


export class VorlesunganlegenComponent {

  kurse: Kurs[]= [];
  dozent: Dozent[]= [];
  
  public currentKurs: string;
  private kursListe: Kurs[];
  private dozentenListe: Dozent[];
  public formKurs: FormGroup;
  error = '';

  formVorlesungen: FormGroup;
  Kursname: string;
  Jahr: number;
  Semester: number;
  DozentVl: string;

  constructor(private fb: FormBuilder,
    public kursController: KursController,
    public dozentenController: DozentenController,
    private toastService: ToastService) {
      this.kursController.currentKurs.subscribe(kurs => {
        this.currentKurs = kurs;
        this.kursChanged();
      });
  
      this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
        this.kursListe = kurse;
        this.kursChanged();
      });
      this.dozentenController.dozentenListe.subscribe(dozent => {
        this.dozentenListe = dozent;
        this.kursChanged();
      }); 
  }

  private kursChanged() {
    this.formVorlesungen = this.fb.group({
      vorlesungenStunden: this.fb.array([])
    })

    if (!this.kursListe || !this.currentKurs) {
      return;
    }

    const kurs = this.kursListe.find(kurs => {
      return kurs.name == this.currentKurs;
    });
    if (!kurs) {
      this.toastService.addError("Fehler aufgetreten, Kurs wurde nicht gefunden");
      return;
    }
/*TODO: IN PROGRESS.....*/
    for (const vorlesung of kurs.vorlesungen) {
      this.vorlesungenStunden.push(
        this.fb.group({
          name: vorlesung.name,
        maxStunden: vorlesung.maxStunden,
        dozent: vorlesung.dozent
        } as Vorlesung)
      )
    }
  }

  public get vorlesungenStunden(): FormArray {
    return this.formVorlesungen.get('vorlesungenStunden') as FormArray;
  }

  public addInput() {
    this.vorlesungenStunden.push(this.fb.group({
      name: undefined,
      maxStunden: undefined,
      dozent: undefined
    } as Vorlesung))
  }

  onSubmit() {

    // //TODO: Daten aus dem Formular in den kursController schreiben + ans Backend senden
    console.log(this.kursController)
  }

  removeInput(index) {
    this.formVorlesungen.controls.vorlesungenStunden["controls"].splice(index, 1)
  }

}