import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import {FormControl} from '@angular/forms'; 
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'kurs-anlegen1',
    templateUrl: './kurs-anlegen1.component.html',
    styleUrls: ['./kurs-anlegen1.component.css']
})

export class Kursanlegen1Component {
 // arrayInputs = [{controlerInputName1 : ['',Validators.required]}, {controlerInputName1: ''}];
  
 arrayInputs = [];

 formName =this.fb.group({
   controllerArray: this.fb.array([])
 })  

 constructor(private fb: FormBuilder) { }

 setArrayInputs(arrayInputs) {
   const arrayFG = arrayInputs.map(address => this.fb.group(address));
   const formArray = this.fb.array(arrayFG);
   this.formName.setControl('controllerArray', formArray);
 }

 ngOnInit() { this.setArrayInputs(this.arrayInputs) }

 addInput() {(this.formName.get('controllerArray') as FormArray).push(this.fb.group({controlerInputName1:''})) }

 removeInput(index) { this.formName.controls.controllerArray["controls"].splice(index,1) }

}