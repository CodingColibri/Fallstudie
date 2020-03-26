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
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { VorlesungEintragenComponent } from '../dozentensicht/vorlesung-eintragen/vorlesung-eintragen.compontent';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class KalenderComponent {
    date: Date;
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
        this.generateCalenderData(this.selectedYear, this.selectedMonth-1);
        this.currentMonth = this.months[this.selectedMonth-1].name;
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

    //Dialog-Fenster "Vorlesung eintragen"
    openDialog(): void {
        let dialogRef = this.dialog.open(VorlesungEintragenComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }

    constructor(public dialog: MatDialog) {
        this.date = new Date();

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
    }

    generateCalenderData(year:number, month:number) {
        this.calenderData.weeks = [];
        let daysInMonth = new Date(year, month+1,0).getDate();
        console.log(daysInMonth); //=> 31
        console.log(month); //=> 2 für März
        console.log(year); //=> 2020
        let firstDay = new Date(year, month, 1); // => 1. Tag im selectedMonth/Year
        console.log(firstDay.getUTCDay()); //=> 6 für Sonntag

        var currentDay = 0;
        var weekNumber = 1;

        while (currentDay < daysInMonth) {
            let temp: Week = {
                weeknumber: weekNumber++,
                days: []
            }
            for (var j = 0; j <= 6; j++) {
                if (currentDay == 0 && j < firstDay.getUTCDay()) {

                    temp.days.push(new CalenderDay(null))
                } else {
                    if (currentDay < daysInMonth) {
                        currentDay = currentDay + 1;
                        temp.days.push(new CalenderDay(currentDay));
                    } else {
                        temp.days.push(new CalenderDay(null))
                    }
                } //close else

            } //close for
            this.calenderData.weeks.push(temp);

        }// close while
    }// close function generateCalenderData
} //close export class KalenderComponent