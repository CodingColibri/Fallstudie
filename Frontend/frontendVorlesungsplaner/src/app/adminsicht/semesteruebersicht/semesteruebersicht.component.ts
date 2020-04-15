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
  public kursListe: Kurs[];

  //TODO: Semesterübersicht soll sich nach select Studienjahrgang aktualisieren (=> Verknüpfung)
  constructor(public kursController: KursController,
    private toastService: ToastService) {
    this.kursController.currentKurs.subscribe(kurs => {
      this.currentKurs = kurs;
      this.kursChanged();
    });

    this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
      this.kursListe = kurse;
      this.kursChanged();
    });
  }

  private kursChanged() {
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
    // console.log(this.kursListe);
  }

}
