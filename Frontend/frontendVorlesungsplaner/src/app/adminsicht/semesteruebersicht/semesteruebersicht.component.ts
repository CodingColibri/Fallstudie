import { Component, OnInit } from '@angular/core';
import { KursAnlegenService } from '@app/services/kurs-anlegen.service';
import { KursKlasse } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';
import { Studienjahrgang } from '@app/models/studienjahrgang-models';
import { StudienjahrgangController } from '@app/controller/studienjahrgang-controller.service';

@Component({
  selector: 'semesteruebersicht',
  templateUrl: './semesteruebersicht.component.html',
  styleUrls: ['./semesteruebersicht.component.css']
})
export class SemesteruebersichtComponent {

  kurse: KursKlasse[]= [];
  studienjahrgang: Studienjahrgang[] = [];
  //TODO: Semesterübersicht soll sich nach select Studienjahrgang aktualisieren (=> Verknüpfung)
  constructor(public kursController: KursController,
    public studienJgController: StudienjahrgangController) {
    this.kursController.kursListe.subscribe((data: KursKlasse[])=> {
      this.kurse = data;
    });
    this.studienJgController.studienjahrListe.subscribe((data: Studienjahrgang[])=> {
      this.studienjahrgang = data;
    });
    this.kursController.loadData();
    this.studienJgController.loadData();
  }
  
  reloadData() {
    this.kursController.loadData();
  }

}
