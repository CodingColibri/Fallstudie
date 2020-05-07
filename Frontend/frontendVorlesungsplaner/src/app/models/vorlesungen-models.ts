import { Dozent } from './dozenten-models';
import { Kurs } from './kurse-models';
import { Termin } from './termin-models';

export interface Vorlesung {
    id: number;
    name?: String;
    std_anzahl?: number;
    kurs?: Kurs[];
    dozenten?: Dozent[];
    termine?: Termin[];
}

export interface VorlesungResponse {
  vorlesungen: Vorlesung[];
}

export interface VorlesungRequestValues {
  id?: number;
  name: String;
  std_anzahl: number;
  dozenten: Dozent[];
}
export interface VorlesungRequest {
  vorlesungen: VorlesungRequestValues[];
}
