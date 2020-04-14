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
    error = '';
    Titel: string;
    Vorname: string;
    Nachname: string;
    Mail: string;

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
        });
        this.formDozenten = this.fb.group({
            dozentenDaten: this.fb.array([])
        });
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
            role: 'dozent'
        } as Dozent))
    }

    public async onSubmit() {
        //TODO: Nachfragen: 400 Bad Request, Missing Mail Parameter?!
        const dozenten: Dozent[] = [];
        this.formDozenten.value.dozentenDaten.forEach(dozent => {
            dozenten.push(dozent);
        });
        console.log(dozenten);
        try {
            const response = await this.dozentenController.saveDozenten(dozenten);
            this.toastService.addSuccess("Semester erfolgreich gespeichert");
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
