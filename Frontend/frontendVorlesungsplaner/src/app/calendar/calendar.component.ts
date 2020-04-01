import { Component, Inject, OnInit, AfterViewInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
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
import { VorlesungenService } from '../services/vorlesungen.service';
import { Time } from '@angular/common';

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
    openDialog(day): void {
        //console.log("Ausgewählter Tag: " + day.date); //day von table-cell mitgegeben
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true; //Dialog kann nicht durch außerhalb klicken geschlossen werden
        dialogConfig.data = day; //Daten über das dialogConfig object übergeben
        //console.log("(KalenderComponent) Übergebene Daten: " + dialogConfig.data);
        let dialogRef = this.dialog.open(VorlesungEintragenComponent, dialogConfig); 
        
        dialogRef.afterClosed().subscribe(data => {
            //this.vlService.vorlesungen = data;
            console.log(data);
            let updateMorning = {
                date: data.date,
                morningOrAfternoon: data.morning.morningOrAfternoon,
                name: data.morning.name,
                startDate: data.morning.startDate,
                endDate: data.morning.endDate
            }
            let updateAfternoon = {
                date: data.date,
                morningOrAfternoon: data.afternoon.morningOrAfternoon,
                name: data.afternoon.name,
                startDate: data.afternoon.startDate,
                endDate: data.afternoon.endDate
            }
            if (data.morning.morningOrAfternoon ==="morning") {
                this.vlService.vorlesungen.push(updateMorning);
            } else if (data.afternoon.morningOrAfternoon ==="afternoon"){
                debugger;
                this.vlService.vorlesungen.push(updateAfternoon);
            }
            debugger;
            this.vlService.vorlesungen.push(data);
        console.log(this.vlService);
        //=>this.vlService.updateVl(data); //TODO
        console.log(data);
        console.log('The dialog was closed');
        });
      }
      openWarning(): void {
        let dialogRef = this.dialog.open(StundenWarnungComponent); 
        dialogRef.afterClosed().subscribe(data => {
            console.log('The dialog was closed');
      });
    }

    constructor(
        public dialog: MatDialog,
        public vlService: VorlesungenService) {
        this.date = new Date(); //aktuelles Datum

        let year = this.date.getFullYear(); //Rückgabe 2020
        this.selectedYear = year;
        this.currentYear = this.selectedYear; //wird oben bei Previous/Next angezeigt
        let month = this.date.getMonth(); //Rückgabe 2
        this.selectedMonth = month;
        this.currentMonth = this.months[this.selectedMonth].name; //wird oben bei Previous/Next angezeigt

        let day = this.date.getDate(); //heutiger Tag als number => 23
        this.generateCalenderData(year,month);
        //CalenderDay initialisieren
        this.calenderDay = new CalenderDay(new Date(null));
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
        var currentDayCounter = 0;
        var weekNumber = 1;
        this.calenderDay = new CalenderDay(null);
        console.log(currentDay.getDate()); //=>1
        console.log(currentDay.getUTCDay());
        while (currentDayCounter < daysInMonth) {
            
            let temp: Week = {
                weeknumber: weekNumber++,
                days: []
            }
            for (var j = 0; j <= 6; j++) {
                //if 1 ==1 && 0 < 6
                if (currentDayCounter == 0 && j < firstDay.getUTCDay()) {
                    temp.days.push(this.calenderDay);
                } else {
                    //if 1 < 31
                    if (currentDayCounter < daysInMonth) {
                        currentDayCounter = currentDayCounter+1;
                        this.calenderDay = new CalenderDay(new Date(currentDay));
                        this.vlService.vorlesungen.filter(vl => //gibt neues gefiltertes Array aus vlService zurück
                            vl.date.getFullYear() == currentDay.getFullYear()
                            && vl.date.getMonth() == currentDay.getMonth()
                            && vl.date.getDate() == currentDay.getDate()
                        ).forEach(vl => {
                            if (vl.morningOrAfternoon === "morning") {
                                this.calenderDay.morning = {
                                    date: vl.date,
                                    name: vl.name,
                                    endDate: vl.endDate,
                                    startDate: vl.startDate
                                }
                            } else {
                                this.calenderDay.afternoon = {
                                    date: vl.date,
                                    name: vl.name,
                                    endDate: vl.endDate,
                                    startDate: vl.startDate
                                }
                            } 
                        });
                        temp.days.push(this.calenderDay);
                        currentDay.setDate(currentDay.getDate()+1); //set CurrentDay +1
                    } else {
                        this.calenderDay = new CalenderDay(null);
                        temp.days.push(this.calenderDay)
                    }
                } //close else
            } //close for
            this.calenderData.weeks.push(temp);
        }// close while
        console.log(this.calenderData);
    }// close function generateCalenderData
} //close export class KalenderComponent