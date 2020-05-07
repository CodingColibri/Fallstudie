import { Injectable } from '@angular/core';
import { Vorlesung } from '../models/vorlesungen-models';
import { Termin } from '@app/models/termin-models';

@Injectable({
  providedIn: 'root'
})
export class VorlesungenService {
  public vorlesungen: Termin[] = [
  ];

  constructor() { }

}
