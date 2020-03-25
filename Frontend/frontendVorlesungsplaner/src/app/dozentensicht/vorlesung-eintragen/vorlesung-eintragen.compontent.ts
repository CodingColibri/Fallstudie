import {Component, Inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from '../../app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import { CalenderData, Week, CalenderDay } from '../../models/calender-models';

@Component({
    selector: 'vorlesung-eintragen',
    templateUrl: '././vorlesung-eintragen.component.html',
    styleUrls: ['././vorlesung-eintragen.component.css']
})

export class VorlesungEintragenComponent {

  calenderDay: CalenderDay;

  vorlesungen: any[] = [
    { name: 'Wissenschaftliches Arbeiten' },
    { name: 'Digitale Transformation' },
    { name: 'Wirtschaftsinformatik' },
];

public useDefaultMorning = false; //mat-slide-toggle Default = false
public useDefaultAfternoon= false; //mat-slide-toggle Default = false
toggleMorning(event: MatSlideToggleChange) {
    console.log('Morning', event.checked);
    this.useDefaultMorning = event.checked;
    if (event.checked == true) {
      console.log("true"); 
     } else {
        console.log("false");
        }
      }
    /*if (event.checked == true) {
      this.calenderDay.morning = true;
    } else {
      this.calenderDay.morning = false;
    }*/
toggleAfternoon(event: MatSlideToggleChange) {
  console.log('Afternoon', event.checked);
  this.useDefaultAfternoon = event.checked;
} 

constructor() {
}
}