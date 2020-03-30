import { Component, Inject, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import * as moment from 'moment';
import { number } from 'prop-types';
import { MatIconRegistry } from '@angular/material/icon';
import { CalenderData, Week, CalenderDay } from '../models/calender-models';
import { WEEKDAYNAMES, MONTHS, YEARS } from '../utils/constants';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { VorlesungEintragenComponent } from '../dozentensicht/vorlesung-eintragen/vorlesung-eintragen.compontent';
import { StundenWarnungComponent } from '../dozentensicht/stunden-warnung/stunden-warnung.component';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class KalenderComponent {
    date: Date; //aktueller Tag/ aktuelles Datum als Date-Objekt
    calenderDay: CalenderDay;
    selectedYear; //bei select/option
    selectedMonth; //bei select/option
    currentYear; //bei previous/next
    currentMonth; //bei previous/next

    //Konstanten
    weekDayNames = WEEKDAYNAMES; //Konstante weekday-Names
    months = MONTHS; //Konstante months (Array Monatsnr., Monatsname)
    years = YEARS; //Konstante months (Array Jahr-ID., Jahr-Name)

    calenderData: CalenderData = {
        weeks: []
    }

    previous() {
        this.currentMonth = this.months[this.selectedMonth-1].name;
        this.selectedMonth = this.selectedMonth-1;
        this.generateCalenderData(this.selectedYear, this.selectedMonth);
    }
    next() {
        this.generateCalenderData(this.selectedYear, this.selectedMonth+1);
        this.currentMonth = this.months[this.selectedMonth+1].name;
    }
    changedMonth(valueMonth) {
        this.selectedMonth = valueMonth;
        this.generateCalenderData(this.selectedYear, this.selectedMonth);
        this.currentMonth = this.months[this.selectedMonth].name;
    }
    changedYear(valueYear) {
        this.selectedYear = valueYear;
        this.generateCalenderData(this.selectedYear, this.selectedMonth);
        this.currentYear = this.selectedYear;
    }

    //Öffnet Dialog-Fenster "Vorlesung eintragen"
    blockedTrue = false;
    openDialog(day): void {
        let tdDayObject = day.date;
        console.log("Ausgewählter Tag: "+tdDayObject); //day von table-cell mitgegeben
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true; //Dialog kann nicht durch außerhalb klicken geschlossen werden
        dialogConfig.data = tdDayObject; //Daten über das dialogConfig object übergeben
        console.log("(KalenderComponent) Übergebene Daten: "+ dialogConfig.data);
        let dialogRef = this.dialog.open(VorlesungEintragenComponent, dialogConfig); 
        
        
        //Objekt tdDayObject der Klasse VorlesungEintragenComponent mitgeben....=> 
        dialogRef.afterClosed().subscribe(data => {

        this.calenderDay = data; //übergebene Daten werden in this.calenderDay geschrieben
        day = this.calenderDay; //übergebene Daten werden in day geschrieben (table-cell)

        // if (day.morning= true) {
        //     this.blockedTrue = true;
        // } else {
        //     this.blockedTrue = false;
        // }
        // if (day.afternoon= true) {
        //     this.blockedTrue = true;
        // } else {
        //     this.blockedTrue = false;
        // }

        console.log("table-cell aktualisiert:"+day);
        console.log(this.calenderDay);
        console.log('The dialog was closed');
        //console.log('Dialog sent:' +this.calenderDay) //=> [object Object]
        });
      }
      openWarning(): void {
        let dialogRef = this.dialog.open(StundenWarnungComponent); 
        dialogRef.afterClosed().subscribe(data => {
            console.log('The dialog was closed');
      });
    }

    constructor(public dialog: MatDialog) {
        this.date = new Date(); //aktuelles Datum

        let year = this.date.getFullYear(); //Rückgabe 2020
        this.selectedYear = year;
        this.currentYear = this.selectedYear; //wird oben bei Previous/Next angezeigt
        //console.log(year);
        let month = this.date.getMonth(); //Rückgabe 2
        this.selectedMonth = month;
        this.currentMonth = this.months[this.selectedMonth].name; //wird oben bei Previous/Next angezeigt
        //console.log(month);

        let day = this.date.getDate(); //heutiger Tag als number => 23
        //console.log(day);
        this.generateCalenderData(year,month);
        //CalenderDay initialisieren
        this.calenderDay = new CalenderDay(new Date(null), false, false, null);
    }

    generateCalenderData(year:number, month:number) {
        this.calenderData.weeks = [];
        let daysInMonth = new Date(year, month+1,0).getDate();
        console.log(daysInMonth); //=> 31
        console.log(month); //=> 2 für März
        console.log(year); //=> 2020

        const firstDay = new Date(year, month, 1); // => 1. Tag im selectedMonth/Year
        console.log(firstDay.getUTCDay()); //=> 6 für Sonntag

        var currentDay = new Date(year, month, firstDay.getDate());
        var weekNumber = 1;
        this.calenderDay = new CalenderDay(null, false, false, null);
        console.log(currentDay.getDate()); //=>1
        console.log(currentDay.getUTCDay());
        while (currentDay.getDate() < daysInMonth) {
            
            let temp: Week = {
                weeknumber: weekNumber++,
                days: []
            }
            for (var j = 0; j <= 6; j++) {
                //if 1 ==1 && 0 < 6
                if (currentDay.getDate() == 1 && j < firstDay.getUTCDay()) {
                    temp.days.push(this.calenderDay);
                } else {
                    //if 1 < 31
                    if (currentDay.getDate() < daysInMonth) {
                        temp.days.push(new CalenderDay(new Date(currentDay), false, false, null));
                        this.calenderDay = new CalenderDay(new Date(currentDay), false, false, null);
                        currentDay.setDate(currentDay.getDate()+1); //set CurrentDay +1
                    } else {
                        this.calenderDay = new CalenderDay(null, false, false, null);
                        temp.days.push(this.calenderDay)
                    }
                } //close else

            } //close for
            this.calenderData.weeks.push(temp);
        }// close while
        console.log(this.calenderData);
    }// close function generateCalenderData
} //close export class KalenderComponent