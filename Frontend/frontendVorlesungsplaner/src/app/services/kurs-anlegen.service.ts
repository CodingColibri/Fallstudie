import { Injectable } from '@angular/core';
// import { KursDTO } from '@app/models/kurse-models';

@Injectable({
    providedIn: 'root'
  })

export class KursAnlegenService {
  //TODO: GET Request/ Daten vom Backend holen
  /*TODO: Info Backend: Dozenten können nur über einen HTTP Request in die Datenbank hinzugefügt 
          werden, da ansonsten bei einer Abfrage ein Fehler mit dem gehashten Passwort auftritt.*/
  // public kurs: KursDTO[] = [
  //   {
  //       name: "WWI2018H",
  //       year: 2018,
  //       semester: [
  //         {
  //           nummer: 4,
  //         }
  //       ],
  //       studiengangsleiter: "Prof. Dr. Richter"
  //     },
  //     {
  //       name: "WWI2018A",
  //       year: 2018,
  //       semester: [
  //         {
  //           nummer: 4,
  //         }
  //       ],
  //       studiengangsleiter: "Prof. Dr. Wenger"
  //     }
  //   ]


  constructor(){
  }
}
