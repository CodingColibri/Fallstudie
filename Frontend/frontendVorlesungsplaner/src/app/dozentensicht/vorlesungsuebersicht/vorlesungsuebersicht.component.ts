import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { KalenderComponent } from '../../calendar/calendar.component';
import { CalenderData, Week, CalenderDay } from '../../models/calender-models';
import { VorlesungenService } from 'src/app/services/vorlesungen.service';
import { KursController } from '@app/controller/kurs-controller.service';
import { ToastService } from '@app/services/toast.service';
import { Kurs } from '@app/models/kurse-models';

@Component({
    selector: 'vorlesungsuebersicht',
    templateUrl: './vorlesungsuebersicht.component.html',
    styleUrls: ['./vorlesungsuebersicht.component.css']
})

export class VorlesungsuebersichtComponent {

    kurse: Kurs[]= [];
    kurs: Kurs;
    public currentKurs: string;
    public kursListe: Kurs[];
    
    constructor(
        public vlService: VorlesungenService,
        public kursController: KursController,
        private toastService: ToastService
    ) {
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
        this.kurs = this.kursListe.find(kurs => {
          return kurs.name == this.currentKurs;

        });
        console.log(this.kurs);
        if (!this.kurs) {
          this.toastService.addError("Fehler aufgetreten, Kurs wurde nicht gefunden");
          return;
        }
      }
}
