import { Injectable } from '@angular/core';
import { Vorlesung } from '../models/module-models';

export interface VorlesungDTO {
  date: Date; //e.g.  02.03.2020
  name?: string;
  startDate?: Date; // TODO: Date
  endDate?: Date; // TODO: Date
  morningOrAfternoon: 'morning' | 'afternoon';
}

@Injectable({
  providedIn: 'root'
})
export class VorlesungenService {
//TODO: HTTP GET Request vom Backend...
  public vorlesungen: VorlesungDTO[] = [
    {
      date: new Date(2020, 3, 2),
      morningOrAfternoon: 'morning',
      name: 'Wissenschaftliches Arbeiten',
      startDate: new Date(2020,3,3,9,0),
      endDate: new Date(2020,3,3,12,15),
    },
    {
      date: new Date(2020, 3, 2),
      morningOrAfternoon: 'afternoon',
      name: 'Web-Programmierung',
      startDate: new Date(2020,3,3,13,15),
      endDate: new Date(2020,3,3,16,30),
    },
    {
      date: new Date(2020, 3, 24),
      morningOrAfternoon: 'morning',
      name: 'Web-Programmierung',
      startDate: new Date(2020,3,25,9,0),
      endDate: new Date(2020,3,25,12,15),
    },
    {
    date: new Date(2020, 3, 13),
    morningOrAfternoon: 'afternoon',
    name: 'Verteilte Systeme',
    startDate: new Date(2020,3,11,13,15),
    endDate: new Date(2020,3,11,16,30)
    },
    {
    date: new Date(2020, 3, 7),
    morningOrAfternoon: 'morning',
    name: 'Projektmanagement',
    startDate: new Date(2020,3,7,9,0),
    endDate: new Date(2020,3,7,12,15)
    },
  ]

  constructor() { }

}
