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
import { VorlesungenController } from '@app/controller/vorlesungen-controller.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrorResponse } from '@app/models/user';

@Component({
  selector: 'vorlesung-anlegen',
  templateUrl: './vorlesung-anlegen.component.html',
  styleUrls: ['./vorlesung-anlegen.component.css']
})


export class VorlesunganlegenComponent {

  kurse: Kurs[] = [];
  dozenten: Dozent[] = [];

  public currentKurs: string;
  private kursListe: Kurs[];
  public formKurs: FormGroup;
  error = '';
  formVorlesungen: FormGroup;

  constructor(private fb: FormBuilder,
              public kursController: KursController,
              public dozentenController: DozentenController,
              public vorlesungenController: VorlesungenController,
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
        this.dozenten = dozent;
        this.kursChanged();
      });
  }

  private kursChanged() {
    this.formVorlesungen = this.fb.group({
      vorlesungenStunden: this.fb.array([])
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
    for (const vorlesung of kurs.vorlesungen) {
      this.vorlesungenStunden.push(
        this.fb.group({
        id: vorlesung.id,
        name: vorlesung.name,
        std_anzahl: vorlesung.std_anzahl,
        dozent: vorlesung.dozenten[0].mail
        } as Vorlesung)
      );
    }
  }

  public get vorlesungenStunden(): FormArray {
    return this.formVorlesungen.get('vorlesungenStunden') as FormArray;
  }

  public addInput() {
    this.vorlesungenStunden.push(this.fb.group({
      id: undefined,
      name: undefined,
      std_anzahl: undefined,
      dozent: []
    } as Vorlesung));
  }

  public async onSubmit() {
    const vorlesungen: Vorlesung[] = [];
    this.formVorlesungen.value.vorlesungenStunden.forEach(vorlesung => {
      vorlesung.dozenten = [vorlesung.dozent];
      vorlesungen.push(vorlesung);
    });
    console.log(vorlesungen);
    try {
      const response = await this.vorlesungenController.saveVorlesungen(this.currentKurs, vorlesungen);
      this.toastService.addSuccess('Vorlesung erfolgreich gespeichert');
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

  deleteVorlesung(index) {
    this.formVorlesungen.controls.vorlesungenStunden["controls"].splice(index, 1);

    const vorlesung = this.formVorlesungen.controls.vorlesungenStunden.value;
    console.log(vorlesung);
    const vorlesungID = vorlesung[index].id;
    try {
      this.vorlesungenController.deleteVorlesung(vorlesungID);
      this.toastService.addSuccess('Kurs erfolgreich gelöscht');
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
    this.kursController.loadData();
  }

}
