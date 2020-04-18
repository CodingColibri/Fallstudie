export interface Dozent {
    titel: string;
    vorname: string;
    nachname: string;
    mail: string;
    role: string;
    password: string;
  }
  export interface DozentRequest {
    titel: string;
    vorname: string;
    nachname: string;
    mail: string;
    role: string;
    password: string;
  }
  export interface DozentResponse {
    dozent: Dozent;
  }
  export interface DozentenRequest {
    dozenten: DozentRequest[];
  }

  export interface DozentenResponse {
    dozenten: Dozent[];
  }

