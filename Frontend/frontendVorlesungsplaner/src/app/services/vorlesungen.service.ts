import { Injectable } from '@angular/core';
import { Vorlesung } from '../models/vorlesungen-models';

export interface VorlesungDTO {
  date: Date;
  name?: string;
  start?: Date;
  ende?: Date;
  morningOrAfternoon: 'morning' | 'afternoon';
}

@Injectable({
  providedIn: 'root'
})
export class VorlesungenService {
  public vorlesungen: VorlesungDTO[] = [
    {
      date: new Date(2020, 3, 2),
      morningOrAfternoon: 'morning',
      name: 'Wissenschaftliches Arbeiten',
      start: new Date(2020,3,3,9,0),
      ende: new Date(2020,3,3,12,15),
    },
    {
      date: new Date(2020, 3, 2),
      morningOrAfternoon: 'afternoon',
      name: 'Web-Programmierung',
      start: new Date(2020,3,3,13,15),
      ende: new Date(2020,3,3,16,30),
    },
    {
      date: new Date(2020, 3, 24),
      morningOrAfternoon: 'morning',
      name: 'Web-Programmierung',
      start: new Date(2020,3,25,9,0),
      ende: new Date(2020,3,25,12,15),
    },
    {
    date: new Date(2020, 3, 13),
    morningOrAfternoon: 'afternoon',
    name: 'Verteilte Systeme',
    start: new Date(2020,3,11,13,15),
    ende: new Date(2020,3,11,16,30)
    },
    {
    date: new Date(2020, 3, 7),
    morningOrAfternoon: 'morning',
    name: 'Projektmanagement',
    start: new Date(2020,3,7,9,0),
    ende: new Date(2020,3,7,12,15)
    },
  ]

  constructor() { }

}
