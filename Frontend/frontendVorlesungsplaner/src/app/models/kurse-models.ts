import { Semester } from './semester-models';

export interface Kurs {
  value: string;
  viewValue: string;
  } 

export interface KursDTO {
  name: string; //e.g.  02.03.2020
  year: number;
  semester: Semester[];
}