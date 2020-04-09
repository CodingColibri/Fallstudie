import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { Vorlesung } from '@app/models/vorlesungen-models';
import { DozentenController } from '@app/controller/dozenten-controller.service';

@Component({
    selector: 'dozenten-anlegen',
    templateUrl: './dozenten-anlegen.component.html',
    styleUrls: ['./dozenten-anlegen.component.css']
})

export class DozentenanlegenComponent {

    formDozenten: FormGroup;
    Titel: string;
    Vorname: string;
    Nachname: string;
    Mail: string;

    constructor(private fb: FormBuilder,
        public dozentenController: DozentenController) {
        this.formDozenten = this.fb.group({
            dozentenDaten: this.fb.array([
            ])
        })
    }
    addInput() {
        //TODO: Backend- Dozenten können nur über einen HTTP Request in die Datenbank hinzugefügt 
        //werden, da ansonsten bei einer Abfrage ein Fehler mit dem gehashten Passwort auftritt.
        const data = this.formDozenten.controls.dozentenDaten as FormArray;
        data.push(this.fb.group({
            Titel: '',
            Vorname: '',
            Nachname: '',
            Mail: ''
        }))
    }

    onSubmit(form: NgForm) {
        console.log(form);
        //TODO: Formulardaten an dozentenController übergeben
        //TODO: Post Request ans Backend
        //this.dozentenController.add();
    }

    removeInput(index) { 
        this.formDozenten.controls.dozentenDaten["controls"].splice(index, 1) 
    }

}