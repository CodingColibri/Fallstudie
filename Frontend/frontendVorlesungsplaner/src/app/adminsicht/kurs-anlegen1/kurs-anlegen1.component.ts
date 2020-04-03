import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, NgForm } from '@angular/forms'; 
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Semester } from '../../models/semester-models';
import { KursAnlegenService } from '../../services/kurs-anlegen.service';

@Component({
    selector: 'kurs-anlegen1',
    templateUrl: './kurs-anlegen1.component.html',
    styleUrls: ['./kurs-anlegen1.component.css']
})


export class Kursanlegen1Component {
 
 semesterAuswahl: Semester[] = [
  {value: 1, viewValue: 1},
  {value: 2, viewValue: 2},
  {value: 3, viewValue: 3},
  {value: 4, viewValue: 4},
  {value: 5, viewValue: 5},
  {value: 6, viewValue: 6}
]; 
//Test//
arrayInputs = [];
// formVorlesungen =this.fb.group({
//    controllerArray: this.fb.array([])
//  }) 
 //TEST

 formKurs : FormGroup;
 formVorlesungen: FormGroup;
 Kursname: string;
 Jahr: number;
 Semester: number;
 Vorlesungstitel: string;
 StundenanzahlVl: number;

 constructor(private fb: FormBuilder, 
  public kursService: KursAnlegenService) {
    this.formKurs = fb.group({
      'Kursname': [null, Validators.required],
      'Jahr': [null, Validators.required],
      'Semester': [null, Validators.required],
      // 'Vorlesungstitel': [null, Validators.required],
      // 'StundenanzahlVl': [null, Validators.required]
    })
    this.formVorlesungen =fb.group({
      'Vorlesungstitel': [null, Validators.required],
      'StundenanzahlVl': [null, Validators.required]
    })
   }

   onSubmit(form: NgForm) {
     debugger;
     console.log(form);
   }
   
setArrayInputs(arrayInputs) {
   const arrayFG = arrayInputs.map(address => this.fb.group(address));
   const formArray = this.fb.array(arrayFG);
   this.formVorlesungen.setControl('controllerArray', formArray);
 }
 ngOnInit() { 
   this.setArrayInputs(this.arrayInputs) 
  }

 addInput() {
   (this.formVorlesungen.get('controllerArray') as FormArray).push(this.fb.group(
     {controlerInputName1:'',
    }
   )
   ) 
  }

 removeInput(index) { this.formVorlesungen.controls.controllerArray["controls"].splice(index,1) }

}