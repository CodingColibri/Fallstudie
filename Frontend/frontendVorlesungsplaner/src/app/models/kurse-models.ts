import { Semester } from './semester-models';

export interface Kurs {
  value: string;
  viewValue: string;
  } 

export interface KursDTO {
  name: string; 
  year: number;
  semester: Semester[];
}