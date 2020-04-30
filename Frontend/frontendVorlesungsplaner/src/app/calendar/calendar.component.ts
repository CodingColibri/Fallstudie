import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { KursController } from '@app/controller/kurs-controller.service';
import { VorlesungEintragenComponent } from '../dozentensicht/vorlesung-eintragen/vorlesung-eintragen.compontent';
import { CalenderData, CalenderDay, Week } from '../models/calender-models';
import { MONTHS, WEEKDAYNAMES, YEARS } from '../utils/constants';
import { ToastService } from '@app/services/toast.service';
import { Kurs } from '@app/models/kurse-models';
import { Termin } from '@app/models/termin-models';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class KalenderComponent {
    public selectedDate: Date; // aktueller Tag/ aktuelles Datum als Date-Objekt

    // Konstanten
    weekDayNames = WEEKDAYNAMES; // Konstante weekday-Names
    months = MONTHS; // Konstante months (Array Monatsnr., Monatsname)
    years = YEARS; // Konstante months (Array Jahr-ID., Jahr-Name)

    calenderData: CalenderData = {
        weeks: []
    };

    public currentKurs: string;
    private kursListe: Kurs[];
    public currentKursObject: Kurs;

    constructor(
        public dialog: MatDialog,
        private kursController: KursController,
        private toastService: ToastService
    ) {
        this.selectedDate = new Date(); // aktuelles Datum

        this.kursController.currentKurs.subscribe(kurs => {
            this.currentKurs = kurs;
            this.kursChanged();
        });

        this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
            this.kursListe = kurse;
            this.kursChanged();
        });
    }

    public kursChanged() {
        if (!this.kursListe || !this.currentKurs) {
            return;
        }

        const kurs = this.kursListe.find(kurs => {
            return kurs.name == this.currentKurs;
        });
        if (!kurs) {
            this.toastService.addError('Fehler aufgetreten, Kurs wurde nicht gefunden');
            return;
        }
        this.currentKursObject = kurs;

        this.generateCalenderData();
    }

    previous() {
        // Necessary to create new Date object that html page is updated
        // Angular does not recognize Date updates on html
        this.selectedDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() - 1));
        this.generateCalenderData();
    }
    next() {
        this.selectedDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() + 1));
        this.generateCalenderData();
    }
    changedMonth(value) {
        this.selectedDate = new Date(this.selectedDate.setMonth(value));
        this.generateCalenderData();
    }
    changedYear(value) {
        this.selectedDate = new Date(this.selectedDate.setFullYear(value));
        this.generateCalenderData();
    }

    // Öffnet Dialog-Fenster "Vorlesung eintragen"
    openDialog(day: CalenderDay): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true; // Dialog kann nicht durch außerhalb klicken geschlossen werden
        dialogConfig.data = day;
        const dialogRef = this.dialog.open(VorlesungEintragenComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((calenderDay: CalenderDay) => {
            console.log('updated calenderDay', calenderDay);
            // KursListe is update automatically -> No more action required
            console.log('The dialog was closed');
        });
    }

    generateCalenderData() {
        this.calenderData.weeks = [];

        // Get last day of month; day 0 = last day of previous month
        const lastDayMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
        const daysInMonth = lastDayMonth.getDate(); // month + 1?

        // Used to detect when the first day of month starts on which weekday
        const lastMonday = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
        lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1); // Substract days to last monday

        const currentDay = new Date(lastMonday);
        let currentDayCounter = 0;
        let weekNumber = 1;
        while (currentDayCounter < daysInMonth) {
            const temp: Week = {
                weeknumber: weekNumber++,
                days: []
            };
            for (let j = 0; j <= 6; j++) {
                // Hint: currentDay doesn't use the time -> can be overwritten temporary
                const morningDateStart = new Date(currentDay.setHours(9, 0, 0, 0));
                const morningDateEnd = new Date(currentDay.setHours(12, 15, 0, 0));
                const afternoonDateStart = new Date(currentDay.setHours(13, 15, 0, 0));
                const afternoonDateEnd = new Date(currentDay.setHours(16, 30, 0, 0));
                const initialCalenderDay = {
                    date: new Date(currentDay),
                    morning: {
                        morningOrAfternoon: 'morning',
                        startDate: morningDateStart,
                        endDate: morningDateEnd,
                        vorlesungsID: 0
                    } as Termin,
                    afternoon: {
                        morningOrAfternoon: 'afternoon',
                        startDate: afternoonDateStart,
                        endDate: afternoonDateEnd,
                        vorlesungsID: 0
                    } as Termin
                } as CalenderDay;

                // if (currentDayCounter == 0 && j < firstDay.getUTCDay()) { //=> 6 für Sonntag
                // if 1 < 31
                if (currentDayCounter < daysInMonth) {
                    for (const vorlesung of this.currentKursObject.vorlesungen) {
                        const termine = vorlesung.termine.filter(termin => this.isSameDay(termin.startDate, currentDay));
                        for (const termin of termine) {
                            if (termin.morningOrAfternoon === 'morning') {
                                initialCalenderDay.morning = termin;
                            } else {
                                initialCalenderDay.afternoon = termin;
                            }
                        }
                    }
                }

                temp.days.push(initialCalenderDay);
                currentDay.setDate(currentDay.getDate() + 1); // set CurrentDay +1
                currentDayCounter++;
            } // close for
            this.calenderData.weeks.push(temp);
        }// close while
    }// close function generateCalenderData

    private isSameDay(t1: Date, t2: Date): boolean {
        return t1.getFullYear() == t2.getFullYear()
            && t1.getMonth() == t2.getMonth()
            && t1.getDate() == t2.getDate();
    }

    public isDayInMonth(calenderDay: CalenderDay) {
        const firstDayMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1, 0, 0, 0, 0);
        const lastDayMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0, 24, 0, 0, 0);
        return calenderDay.date > firstDayMonth && calenderDay.date < lastDayMonth;
    }
} // close export class KalenderComponent
