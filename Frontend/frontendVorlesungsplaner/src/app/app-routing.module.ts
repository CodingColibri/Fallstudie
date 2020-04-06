import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundComponent } from './welcome-background/welcome-background.component';
import { DozentenheaderComponent } from './dozentensicht/dozentenheader/dozentenheader.component';
import { AdminheaderComponent } from './adminsicht/adminheader/adminheader.component'; 
import { WelcomebuttonsComponent } from './adminsicht/welcome-buttons/welcome-buttons.component';
import { DwelcomebuttonsComponent } from './dozentensicht/dwelcome-buttons/dwelcome-buttons.component';
import { DashboardbuttonsComponent } from './adminsicht/dashboard-buttons/dashboard-buttons.component';
import { Kursanlegen1Component } from './adminsicht/kurs-anlegen1/kurs-anlegen1.component';
import { DozentenanlegenComponent } from './adminsicht/dozenten-anlegen/dozenten-anlegen.component';
import { SemesteranlegenComponent } from './adminsicht/semester-anlegen/semester-anlegen.component';
import { KalenderComponent } from './calendar/calendar.component';
import { VorlesungEintragenComponent } from './dozentensicht/vorlesung-eintragen/vorlesung-eintragen.compontent';
import { LoginComponent } from './login/login.component';
import { VorlesungsuebersichtComponent } from './dozentensicht/vorlesungsuebersicht/vorlesungsuebersicht.component';
import { StundenWarnungComponent } from './dozentensicht/stunden-warnung/stunden-warnung.component';
import { DozentenKalenderComponent } from './dozentensicht/dozentenkalender/dozentenkalender.component';
import { AdminKalenderComponent } from './adminsicht/adminkalender/adminkalender.component';
import { KursuebersichtComponent } from './adminsicht/kursuebersicht/kursuebersicht.component';
import { LoginViewsComponent } from './login-views/login-views.component';
import { AuthGuard } from '../app/helpers'
import { VorlesunganlegenComponent } from './adminsicht/vorlesung-anlegen/vorlesung-anlegen.component';
import { KursDozentenRegistrierungComponent } from './adminsicht/registierung/registrierung.component';
import { AdministrationComponent } from './adminsicht/administration/administration.component';

const routes: Routes = [
  { path: '', component: WelcomebuttonsComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'login-views', component: LoginViewsComponent },
  //otherwise redirect to home
  // { path: '**', redirectTo: ''},
  { path: 'dashboard', component: DashboardbuttonsComponent },
  { path: 'Semesterneuanlegen', component: SemesteranlegenComponent },
  { path: 'kurs-anlegen-1', component: Kursanlegen1Component },
  { path: 'dozenten-anlegen', component: DozentenanlegenComponent }, 
  { path: 'willkommen', component: WelcomebuttonsComponent}, 
  { path: 'dwelcome', component: DwelcomebuttonsComponent },
  { path: 'zurück', component: Kursanlegen1Component, }, 
  { path: 'kalenderansicht', component: KalenderComponent },
  { path: 'vorlesungsuebersicht', component: VorlesungsuebersichtComponent },
  { path: 'stunden-warnung', component: StundenWarnungComponent },
  { path: 'dozentenkalender', component: DozentenKalenderComponent },
  { path: 'adminkalender', component: AdminKalenderComponent },
  { path: 'kursuebersicht', component: KursuebersichtComponent },
  { path: 'login-views', component: LoginViewsComponent },
  { path: 'administration', component: AdministrationComponent},
  { path: 'vorlesung-anlegen', component: VorlesunganlegenComponent},
  { path: 'kurs-dozent-registrierung', component: KursDozentenRegistrierungComponent}


  // [canActivate => Implementieren, Prüfung Admin/ Berechtigung das zu sehen]
];
export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {enableTracing: true })
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
