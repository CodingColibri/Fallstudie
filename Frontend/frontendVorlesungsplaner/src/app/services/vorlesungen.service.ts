import { Injectable } from '@angular/core';
import { Vorlesung } from '../models/vorlesungen-models';
import { Termin } from '@app/models/termin-models';

// export interface VorlesungDTO {
//   date: Date;
//   name?: string;
//   start?: Date;
//   ende?: Date;
//   morningOrAfternoon: 'morning' | 'afternoon';
// }

@Injectable({
  providedIn: 'root'
})
export class VorlesungenService {
  public vorlesungen: Termin[] = [
  //   {
  //     date: new Date(2020, 3, 2),
  //     morningOrAfternoon: 'morning',
  //     startDate: new Date(2020,3,3,9,0),
  //     endDate: new Date(2020,3,3,12,15),
  //   },
  //   {
  //     date: new Date(2020, 3, 2),
  //     morningOrAfternoon: 'afternoon',
  //     startDate: new Date(2020,3,3,13,15),
  //     endDate: new Date(2020,3,3,16,30),
  //   },
  //   {
  //     date: new Date(2020, 3, 24),
  //     morningOrAfternoon: 'morning',
  //     startDate: new Date(2020,3,25,9,0),
  //     endDate: new Date(2020,3,25,12,15),
    // }
  ]

  constructor() { }

}
