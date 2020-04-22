import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { KursController } from '@app/controller/kurs-controller.service';
import { Kurs } from '@app/models/kurse-models';
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
  kurse: Kurs[]= [];

  constructor(private fb: FormBuilder,
    public kursController: KursController,
    private toastService: ToastService) {
    this.formKurs = this.fb.group({
      kursData: this.fb.array([
      ])
    });
    this.kursController.kursListe.subscribe((data: Kurs[]) => {
      this.kurse = data;
    });
  }
//addInput() = dynamic rows im html
  public addInput() {
    const vlStunden = this.formKurs.controls.kursData as FormArray;
    vlStunden.push(this.fb.group({
      name: undefined,
      semester: undefined,
      studienjahrgang: undefined,
      studiengangsleiter: undefined,
      vorlesungen: undefined
    }as Kurs))
  }

  public async onSubmit() {
    try {
      this.formKurs.value.kursData.forEach(async kurs => {
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

  removeInput(index) {
    this.formKurs.controls.kursData["controls"].splice(index, 1)
  }

}