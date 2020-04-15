import { Component, OnInit } from '@angular/core';
import { Kurs } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'semesteruebersicht',
  templateUrl: './semesteruebersicht.component.html',
  styleUrls: ['./semesteruebersicht.component.css']
})
export class SemesteruebersichtComponent {

  kurse: Kurs[]= [];
  public currentKurs: string;
  private kursListe: Kurs[]

  //TODO: Semesterübersicht soll sich nach select Studienjahrgang aktualisieren (=> Verknüpfung)
  constructor(public kursController: KursController,
    private toastService: ToastService) {
    this.kursController.currentKurs.subscribe(kurs => {
      this.currentKurs = kurs;
    });

    this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
      this.kursListe = kurse;
    });
  }

}
