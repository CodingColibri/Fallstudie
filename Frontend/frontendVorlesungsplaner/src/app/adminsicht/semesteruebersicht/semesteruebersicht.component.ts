import { Component, OnInit } from '@angular/core';
import { Kurs } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';
import { Studienjahrgang } from '@app/models/studienjahrgang-models';
import { StudienjahrgangController } from '@app/controller/studienjahrgang-controller.service';

@Component({
  selector: 'semesteruebersicht',
  templateUrl: './semesteruebersicht.component.html',
  styleUrls: ['./semesteruebersicht.component.css']
})
export class SemesteruebersichtComponent {

  kurse: Kurs[]= [];
  studienjahrgang: Studienjahrgang[] = [];
  //TODO: Semesterübersicht soll sich nach select Studienjahrgang aktualisieren (=> Verknüpfung)
  constructor(public kursController: KursController,
    public studienJgController: StudienjahrgangController) {
    this.kursController.kursListe.subscribe((data: Kurs[])=> {
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
