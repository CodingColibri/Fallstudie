import { Component, OnInit } from '@angular/core';
import { KursAnlegenService } from '@app/services/kurs-anlegen.service';

@Component({
  selector: 'app-kursuebersicht',
  templateUrl: './kursuebersicht.component.html',
  styleUrls: ['./kursuebersicht.component.css']
})
export class KursuebersichtComponent {

  constructor(public kursService: KursAnlegenService)
  {
}

}
