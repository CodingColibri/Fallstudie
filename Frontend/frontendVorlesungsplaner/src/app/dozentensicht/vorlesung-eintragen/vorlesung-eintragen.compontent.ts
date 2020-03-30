import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from '../../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { CalenderData, Week, CalenderDay } from '../../models/calender-models';
import { Modul, Vorlesung } from '../../models/module-models';
import { KalenderComponent } from 'src/app/calendar/calendar.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vorlesung-eintragen',
  templateUrl: '././vorlesung-eintragen.component.html',
  styleUrls: ['././vorlesung-eintragen.component.css']
})

export class VorlesungEintragenComponent {

  selectedVorlesung: string; //ausgewählte Vorlesung im Dialog
  vorlesung: Vorlesung = {
    name: null,
    stunden: 3.15
  }

  vorlesungen: Vorlesung[] = [
    {
      name: 'Wissenschaftliches Arbeiten',
      stunden: 3.15
      // startDate: new Date(),
      // endDate: new Date()
    },
    {
      name: 'Digitale Transformation',
      stunden: 3.15
    },
    {
      name: 'Wirtschaftsinformatik',
      stunden: 3.15
    },
  ];

  toggleMorning(event: MatSlideToggleChange) {
    console.log(this.calenderDay);
    this.calenderDay.afternoon = false;
    // console.log('Morning', event.checked);
    // this.useDefaultMorning = event.checked;
    // this.calenderDay.morning = event.checked;
  }
  toggleAfternoon(event: MatSlideToggleChange) {
    this.calenderDay.morning = false;
    console.log(this.calenderDay);
  }

  addVorlesung(): void {
    this.vorlesung.name = this.selectedVorlesung;
    console.log("Vorlesung eingetragen: "+this.vorlesung.name);
    this.calenderDay.vorlesung.push(this.vorlesung);
    console.log(this.calenderDay);
    this.dialogRef.close(this.calenderDay);
  }

  calenderDay: CalenderDay;
  
  constructor(private dialogRef: MatDialogRef<VorlesungEintragenComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.calenderDay = new CalenderDay(new Date(data), false, false, null);
    console.log("(DialogComponent) Übergebene Daten: " + data); 
    console.log("Daten speichern in this.calenderDay:" +this.calenderDay.date);
    console.log(this.calenderDay);
  }
}