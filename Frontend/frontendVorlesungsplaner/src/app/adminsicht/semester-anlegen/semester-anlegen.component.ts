import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import {FormControl} from '@angular/forms'; 
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

@Component({
    selector: 'semester-anlegen',
    templateUrl: './semester-anlegen.component.html',
    styleUrls: ['./semester-anlegen.component.css'],

})

export class SemesteranlegenComponent  {
   //date = new FormControl(new Date());
  //serializedDate = new FormControl((new Date()).toISOString());

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