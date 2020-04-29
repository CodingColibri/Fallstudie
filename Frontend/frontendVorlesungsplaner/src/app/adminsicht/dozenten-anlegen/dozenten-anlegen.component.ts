import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { Vorlesung } from '@app/models/vorlesungen-models';
import { DozentenController } from '@app/controller/dozenten-controller.service';
import { Kurs } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';
import { ToastService } from '@app/services/toast.service';
import { Dozent, DozentRequest, DozentenRequest } from '@app/models/dozenten-models';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrorResponse } from '@app/models/user';

@Component({
    selector: 'dozenten-anlegen',
    templateUrl: './dozenten-anlegen.component.html',
    styleUrls: ['./dozenten-anlegen.component.css']
})

export class DozentenanlegenComponent {

    public formDozenten: FormGroup;
    public currentKurs: string;
    private kursListe: Kurs[];
    private dozentenListe: Dozent[];
    dozenten: Dozent[] = [];
    error = '';

    constructor(private fb: FormBuilder,
        public dozentenController: DozentenController,
        private kursController: KursController,
        private toastService: ToastService
    ) {
        this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
            this.kursListe = kurse;
            this.loadDozenten();
        });
        
        this.dozentenController.dozentenListe.subscribe((dozenten: Dozent[]) => {
            this.dozentenListe = dozenten;
            this.loadDozenten();
        });
    }

    public loadDozenten() {  
        this.formDozenten = this.fb.group({
            dozentenDaten: this.fb.array([])
        });
        if (!this.dozentenListe){
            return;
        }
        console.log(this.dozentenListe);
        for (const dozent of this.dozentenListe) {
            this.dozentenDaten.push(
              this.fb.group({
                titel: dozent.titel,
                vorname: dozent.vorname,
                nachname: dozent.nachname,
                mail: dozent.mail,
                role: dozent.role,
                password: undefined
              } as Dozent)
            )
          }
    }
    public get dozentenDaten(): FormArray {
        return this.formDozenten.get('dozentenDaten') as FormArray;
    }

    public addInput() {
        //const data = this.formDozenten.controls.dozentenDaten as FormArray;
        this.dozentenDaten.push(this.fb.group({
            titel: undefined,
            vorname: undefined,
            nachname: undefined,
            mail: undefined,
            role: 'dozent',
            password: undefined
        } as DozentRequest))
    }

    public async onSubmit() {
        var dozentenValue: Dozent;
        this.formDozenten.value.dozentenDaten.forEach(dozent => {
            dozentenValue = dozent;
            this.dozenten.push(dozent);
        })
        console.log(this.dozenten);
        try {
            // this.formDozenten.value.dozentenDaten.forEach(async dozent => {
                const response = await this.dozentenController.saveDozent(dozentenValue);
                // this.dozenten.push(dozent);
                // console.log(dozent);            
            // });
            console.log(this.dozenten);
            this.toastService.addSuccess("Erfolgreich gespeichert");
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

    deleteDozent(index) {
        this.formDozenten.controls.dozentenDaten["controls"].splice(index, 1);
        const dozent = this.formDozenten["controls"].dozentenDaten.value;
        const dozentMail = dozent[index].mail;
        try{
          this.dozentenController.deleteDozent(dozentMail);
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
        this.loadDozenten();
    }

}
