import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { Vorlesung } from '@app/models/vorlesungen-models';
import { DozentenController } from '@app/controller/dozenten-controller.service';
import { Kurs } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';
import { ToastService } from '@app/services/toast.service';
import { Dozent } from '@app/models/dozenten-models';
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
        });
        
        this.dozentenController.dozentenListe.subscribe((dozenten: Dozent[]) => {
            this.dozentenListe = dozenten;
            this.loadDozenten();
            console.log(this.dozentenListe);
        });
        this.formDozenten = this.fb.group({
            dozentenDaten: this.fb.array([])
        });
    }

    public loadDozenten() {
        for (const dozent of this.dozenten) {
            this.dozentenDaten.push(
              this.fb.group({
                titel: dozent.titel,
                vorname: dozent.vorname,
                nachname: dozent.nachname,
                mail: dozent.mail,
                role: dozent.role
              } as Dozent)
            )
          }
    }
    public get dozentenDaten(): FormArray {
        return this.formDozenten.get('dozentenDaten') as FormArray;
    }

    addInput() {
        const data = this.formDozenten.controls.dozentenDaten as FormArray;
        this.dozentenDaten.push(this.fb.group({
            titel: undefined,
            vorname: undefined,
            nachname: undefined,
            mail: undefined,
            role: 'dozent',
            password: undefined
        } as Dozent))
    }

    public async onSubmit() {
        try {
            this.formDozenten.value.dozentenDaten.forEach(async dozent => {
                const response = await this.dozentenController.saveDozent(dozent);    
                console.log(dozent);            
            });
            console.log(this.dozenten);
            // this.formDozenten.controls.dozentenDaten.value.forEach(async dozentValues => {
            //     const response = await this.dozentenController.saveDozenten(dozentValues);
            //     this.dozenten.push(dozentValues);
            //     console.log(this.dozenten);
            // });
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

    removeInput(index) {
        this.formDozenten.controls.dozentenDaten["controls"].splice(index, 1)
    }

}
