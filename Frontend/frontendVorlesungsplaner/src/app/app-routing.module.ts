import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundComponent } from './welcome-background/welcome-background.component';
import { DozentenheaderComponent } from './dozentensicht/dozentenheader/dozentenheader.component';
import { AdminheaderComponent } from './adminsicht/adminheader/adminheader.component'; 
import { WelcomebuttonsComponent } from './adminsicht/welcome-buttons/welcome-buttons.component';
import { DwelcomebuttonsComponent } from './dozentensicht/dwelcome-buttons/dwelcome-buttons.component';
import { DashboardbuttonsComponent } from './adminsicht/dashboard-buttons/dashboard-buttons.component';
import { Kursanlegen1Component } from './adminsicht/kurs-anlegen1/kurs-anlegen1.component';
import { Kursanlegen2Component } from './adminsicht/kurs-anlegen2/kurs-anlegen2.component';
import { SemesteranlegenComponent } from './adminsicht/semester-anlegen/semester-anlegen.component';
import { KalenderComponent } from './calendar/calendar.component';
import { VorlesungEintragenComponent } from './dozentensicht/vorlesung-eintragen/vorlesung-eintragen.compontent';
import { LoginComponent } from './login/login.component';
import { VorlesungsuebersichtComponent } from './dozentensicht/vorlesungsuebersicht/vorlesungsuebersicht.component';
import { StundenWarnungComponent } from './dozentensicht/stunden-warnung/stunden-warnung.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardbuttonsComponent }, 
  { path: 'Kursneuanlegen', component: Kursanlegen1Component },
  { path: 'Semesterneuanlegen', component: SemesteranlegenComponent },
  { path: 'Dozenten', component: Kursanlegen2Component }, 
  { path: 'willkommen', component: WelcomebuttonsComponent, }, 
  { path: 'dwelcome', component: DwelcomebuttonsComponent },
  { path: 'zurück', component: Kursanlegen1Component, }, 
  { path: 'kalenderansicht', component: KalenderComponent },
  { path: 'vorlesungsuebersicht', component: VorlesungsuebersichtComponent },
  { path: 'stunden-warnung', component: StundenWarnungComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {enableTracing: true })
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
