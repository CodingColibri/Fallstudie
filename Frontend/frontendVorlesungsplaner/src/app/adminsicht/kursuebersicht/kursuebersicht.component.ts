import { Component, OnInit } from '@angular/core';
import { KursKlasse } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';

@Component({
  selector: 'app-kursuebersicht',
  templateUrl: './kursuebersicht.component.html',
  styleUrls: ['./kursuebersicht.component.css']
})
export class KursuebersichtComponent {

  kurse: KursKlasse[]= [];
  
  constructor(public kursController: KursController) {
    this.kursController.kursListe.subscribe((data: KursKlasse[])=> {
      this.kurse = data;
    });
    this.kursController.loadData();
  }

  // addData(){
  //   this.kursController.addKurs(new KursKlasse("WWI2016X", 2020,[],"test"));
  // }
}
