import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from '../../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { CalenderData, Week, CalenderDay } from '../../models/calender-models';
import { Vorlesung } from '../../models/vorlesungen-models';
import { Modul } from '../../models/module-models';
import { KalenderComponent } from 'src/app/calendar/calendar.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vorlesung-eintragen',
  templateUrl: '././vorlesung-eintragen.component.html',
  styleUrls: ['././vorlesung-eintragen.component.css']
})

export class VorlesungEintragenComponent {

  selectedVorlesung: string; //ausgewählte Vorlesung im Dialog

  vorlesungen: Vorlesung[] = [
    {
      name: 'Wissenschaftliches Arbeiten'
    },
    {
      name: 'Digitale Transformation'
    },
    {
      name: 'Wirtschaftsinformatik'
    },
  ];

  addVorlesung(): void {
  //TODO: POST Request an Backend Service
    this.dialogRef.close(this.calenderDay);
  }
  //TODO: Dialogfester => close() und Vorlesung löschen implementieren
  close() {
    
  }

  calenderDay: CalenderDay;
  
  handleTimeStartMorning(date) {
    var array = date.split(":")
    this.calenderDay.morning.startDate.setHours(array[0],array[1]);
  }
  handleTimeEndMorning(date) {
    var array = date.split(":")
    this.calenderDay.morning.endDate.setHours(array[0],array[1]);
  }
  handleTimeStartAfternoon(date) {
    var array = date.split(":")
    this.calenderDay.afternoon.startDate.setHours(array[0],array[1]);
  }
  handleTimeEndAfternoon(date) {
    var array = date.split(":")
    this.calenderDay.afternoon.endDate.setHours(array[0],array[1]);
  }

  constructor(
    private dialogRef: MatDialogRef<VorlesungEintragenComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    //console.log(this.calenderDay.afternoon.endDate);
    this.calenderDay = data;
    //this.afternoonStartDate = this.calenderDay.afternoon?.startDate || new Date(this.calenderDay.afternoon.startDate.setHours(13,15));
    //=> "||" if else inline; if (1) true, dann Wert als Value gesetzt, ansonsten (2)
    //this.afternoonEndDate = this.calenderDay.afternoon?.endDate || new Date(this.calenderDay.afternoon.startDate.setHours(16,30));
    console.log("(DialogComponent) Übergebene Daten: " + this.calenderDay); 
  }
}