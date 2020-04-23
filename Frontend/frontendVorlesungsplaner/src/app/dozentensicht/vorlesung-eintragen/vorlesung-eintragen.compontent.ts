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
import { KursController } from '@app/controller/kurs-controller.service';
import { ToastService } from '@app/services/toast.service';
import { Kurs } from '@app/models/kurse-models';
import { Termin } from '@app/models/termin-models';
import { TerminController } from '@app/controller/termin-controller.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrorResponse } from '@app/models/user';

@Component({
  selector: 'vorlesung-eintragen',
  templateUrl: './vorlesung-eintragen.component.html',
  styleUrls: ['./vorlesung-eintragen.component.css']
})

export class VorlesungEintragenComponent {

  public currentKurs: string;
  private kursListe: Kurs[]
  public currentKursObject: Kurs;
  error = '';

  oldCalenderDay: CalenderDay;
  calenderDay: CalenderDay;

  constructor(
    private kursController: KursController,
    private terminController: TerminController,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<VorlesungEintragenComponent>,
    @Inject(MAT_DIALOG_DATA) day: CalenderDay
  ) {
    this.kursController.currentKurs.subscribe(kurs => {
      this.currentKurs = kurs;
      this.kursChanged();
    });

    this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
      this.kursListe = kurse;
      this.kursChanged();
    });

    this.oldCalenderDay = day;
    this.calenderDay = { //Create new object to not modify original one
      date: day.date,
      morning: {
        id: day.morning.id,
        startDate: day.morning.startDate,
        endDate: day.morning.endDate,
        vorlesungsID: day.morning.vorlesungsID,
        morningOrAfternoon: day.morning.morningOrAfternoon
      },
      afternoon: {
        id: day.afternoon.id,
        startDate: day.afternoon.startDate,
        endDate: day.afternoon.endDate,
        vorlesungsID: day.afternoon.vorlesungsID,
        morningOrAfternoon: day.afternoon.morningOrAfternoon
      }
    } as CalenderDay;;
    console.log("Dialog übergebene Daten", day);
  }

  public kursChanged() {
    if (!this.kursListe || !this.currentKurs) {
      return;
    }

    const kurs = this.kursListe.find(kurs => {
      return kurs.name == this.currentKurs;
    });
    if (!kurs) {
      this.toastService.addError("Fehler aufgetreten, Kurs wurde nicht gefunden");
      return;
    }

    this.currentKursObject = kurs;
  }

  addVorlesung(): void {
    try{
      const termin1 = this.calenderDay.morning;
      //Check if termin has had an id and if vorlesungsID was changed
      if (termin1.id && termin1.vorlesungsID != this.oldCalenderDay.morning.vorlesungsID) {
        //TODO: Check if updated kursListe (see controller) makes problems on comming operations
        this.terminController.deleteTermin(termin1.vorlesungsID, termin1.id)
        delete termin1.id; // Delete id as the termin has to be recreated for the new Vorlesung
      }
      this.terminController.saveTermine(termin1.vorlesungsID, [termin1]);

      const termin2 = this.calenderDay.afternoon;
      if (termin2.id && termin2.vorlesungsID != this.oldCalenderDay.afternoon.vorlesungsID) {
        this.terminController.deleteTermin(termin2.vorlesungsID, termin2.id)
        delete termin2.id; // Delete id as the termin has to be recreated for the new Vorlesung
      }
      this.terminController.saveTermine(termin2.vorlesungsID, [termin2]);
      this.toastService.addSuccess("Vorlesung erfolgreich angelegt");
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        const error = err.error as BackendErrorResponse;
        this.error = error.msg;
        this.toastService.addError(error.msg);
      } else {
        console.error(err);
        this.toastService.addError("Ein unbekannter Fehler ist aufgetreten");
      }
    }
      this.dialogRef.close(this.calenderDay);
  }
  deleteTerminMorning(){
    const termin1 = this.calenderDay.morning;
    try{
      this.terminController.deleteTermin(termin1.vorlesungsID, termin1.id);
      this.toastService.addSuccess("Vorlesung erfolgreich gelöscht");
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        const error = err.error as BackendErrorResponse;
        this.error = error.msg;
        this.toastService.addError(error.msg);
      } else {
        console.error(err);
        this.toastService.addError("Ein unbekannter Fehler ist aufgetreten");
      }
    }
    this.dialogRef.close(this.calenderDay);
  }
  deleteTerminAfternoon(){
    const termin2 = this.calenderDay.afternoon;
    try {
      this.terminController.deleteTermin(termin2.vorlesungsID, termin2.id)
      this.toastService.addSuccess("Vorlesung erfolgreich gelöscht");
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
        const error = err.error as BackendErrorResponse;
        this.error = error.msg;
        this.toastService.addError(error.msg);
      } else {
        console.error(err);
        this.toastService.addError("Ein unbekannter Fehler ist aufgetreten");
      }
    }
    this.dialogRef.close(this.calenderDay);
  }

  close(): void {
    this.dialogRef.close();
  }

  handleTimeStartMorning(date) {
    var array = date.split(":")
    this.calenderDay.morning.startDate.setHours(array[0], array[1]);
  }
  handleTimeEndMorning(date) {
    var array = date.split(":")
    this.calenderDay.morning.endDate.setHours(array[0], array[1]);
  }
  handleTimeStartAfternoon(date) {
    var array = date.split(":")
    this.calenderDay.afternoon.startDate.setHours(array[0], array[1]);
  }
  handleTimeEndAfternoon(date) {
    var array = date.split(":")
    this.calenderDay.afternoon.endDate.setHours(array[0], array[1]);
  }
}