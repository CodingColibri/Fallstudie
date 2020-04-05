import { Injectable } from '@angular/core';
import { KursDTO } from '@app/models/kurse-models';

@Injectable({
    providedIn: 'root'
  })

export class KursAnlegenService {
  //TODO: GET Request/ Daten vom Backend holen
  public kurs: KursDTO[] = [
    {
        name: "WWI2018H",
        year: 2018,
        semester: [
          {
            value: 4,
            viewValue: 4,
          }
        ],
        studiengangsleiter: "Prof. Dr. Richter"
      },
      {
        name: "WWI2018A",
        year: 2018,
        semester: [
          {
            value: 4,
            viewValue: 4,
          }
        ],
        studiengangsleiter: "Prof. Dr. Wenger"
      }
    ]


  constructor(){
  }
}
