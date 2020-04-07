import { Time } from '@angular/common';
import { Vorlesung } from './vorlesungen-models';

export interface Modul {
    name: string;
    vorlesungen: Vorlesung[];
  } 

