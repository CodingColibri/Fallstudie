import { Semester } from './semester-models';
import { Vorlesung } from './vorlesungen-models';

export interface Kurs {
  name: string; 
  studienjahr: number; 
  semester: Semester[]; 
  studiengangsleiter: string; 
  vorlesungen: Vorlesung[];
}

export interface KursResponse {
  kurs: Kurs;
}

export interface KurseResponse {
  kurse: Kurs[];
}

export interface KursRequest {
  name: string;
  studienjahrgang: number;
  studiengangsleiter: string;
}