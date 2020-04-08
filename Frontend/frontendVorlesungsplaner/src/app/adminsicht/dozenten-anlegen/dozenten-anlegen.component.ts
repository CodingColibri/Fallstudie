import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { KursAnlegenService } from '@app/services/kurs-anlegen.service';
import { Vorlesung } from '@app/models/vorlesungen-models';

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
        public kursService: KursAnlegenService) {
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
    }

    removeInput(index) { 
        this.formDozenten.controls.dozentenDaten["controls"].splice(index, 1) 
    }

}
