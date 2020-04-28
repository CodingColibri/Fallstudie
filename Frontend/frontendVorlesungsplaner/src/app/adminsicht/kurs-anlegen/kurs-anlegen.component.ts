import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { KursController } from '@app/controller/kurs-controller.service';
import { Kurs, KursRequest } from '@app/models/kurse-models';
import { ToastService } from '@app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrorResponse } from '@app/models/user';

@Component({
  selector: 'kurs-anlegen',
  templateUrl: './kurs-anlegen.component.html',
  styleUrls: ['./kurs-anlegen.component.css']
})


export class KursanlegenComponent {

  public formKurs: FormGroup;
  error = '';
  public currentKurs: string;
  kurse: Kurs[] = [];
  private kursListe: Kurs[];

  constructor(private fb: FormBuilder,
    public kursController: KursController,
    private toastService: ToastService) {

    this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
      this.kursListe = kurse;
      this.loadKurse();
    });
  }

  public loadKurse() {
    this.formKurs = this.fb.group({
      kursData: this.fb.array([])
    });
    if (!this.kursListe) {
      return;
    }
    console.log(this.kursListe);
    for (const kurse of this.kursListe) {
      this.kursData.push(
        this.fb.group({
          name: kurse.name,
          studienjahr: kurse.studienjahr,
          studiengangsleiter: kurse.studiengangsleiter,
        } as KursRequest)
      )
    }
  }

  public get kursData(): FormArray {
    return this.formKurs.get('kursData') as FormArray;
  }
  //addInput() = dynamic rows im html
  public addInput() {
    const vlStunden = this.formKurs.controls.kursData as FormArray;
    vlStunden.push(this.fb.group({
      name: undefined,
      studienjahr: undefined,
      studiengangsleiter: undefined,
    } as KursRequest))
  }

  public async onSubmit() {
    console.log(this.formKurs.value.kursData);
    try {
      this.formKurs.value.kursData.forEach(async kurs => {
        debugger
        const response = await this.kursController.createKurs(kurs);
      });
      console.log(this.kurse);
      this.toastService.addSuccess("Kurs erfolgreich gespeichert");
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        const error = err.error as BackendErrorResponse;
        this.error = error.msg;
        this.toastService.addError(error.msg);
      } else {
        console.error(err);
        this.toastService.addError("Ein unbekannter Fehler ist aufgetreten");
      }
    }
  }

  deleteKurs(index) {
    this.formKurs.controls.kursData["controls"].splice(index, 1);
    const kurs = this.formKurs["controls"].kursData.value;
    const kursName = kurs[index].name;
    try{
      this.kursController.deleteKurs(kursName);
      this.toastService.addSuccess("Kurs erfolgreich gelöscht");
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        const error = err.error as BackendErrorResponse;
        this.error = error.msg;
        this.toastService.addError(error.msg);
      } else {
        console.error(err);
        this.toastService.addError("Ein unbekannter Fehler ist aufgetreten");
      }
    }
    this.loadKurse();
  }

}