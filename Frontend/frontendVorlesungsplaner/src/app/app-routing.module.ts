import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './adminsicht/administration/administration.component';
import { AdminKalenderComponent } from './adminsicht/adminkalender/adminkalender.component';
import { AdminDashboardComponent } from './adminsicht/dashboard/dashboard.component';
import { DozentenanlegenComponent } from './adminsicht/dozenten-anlegen/dozenten-anlegen.component';
import { KursanlegenComponent } from './adminsicht/kurs-anlegen/kurs-anlegen.component';
import { KursuebersichtComponent } from './adminsicht/kursuebersicht/kursuebersicht.component';
import { KursDozentenRegistrierungComponent } from './adminsicht/registierung/registrierung.component';
import { SemesteranlegenComponent } from './adminsicht/semester-anlegen/semester-anlegen.component';
import { SemesteruebersichtComponent } from './adminsicht/semesteruebersicht/semesteruebersicht.component';
import { VorlesunganlegenComponent } from './adminsicht/vorlesung-anlegen/vorlesung-anlegen.component';
import { WelcomebuttonsComponent } from './adminsicht/welcome-buttons/welcome-buttons.component';
import { KalenderComponent } from './calendar/calendar.component';
import { DozentenKalenderComponent } from './dozentensicht/dozentenkalender/dozentenkalender.component';
import { DwelcomebuttonsComponent } from './dozentensicht/dwelcome-buttons/dwelcome-buttons.component';
import { StundenWarnungComponent } from './dozentensicht/stunden-warnung/stunden-warnung.component';
import { VorlesungsuebersichtComponent } from './dozentensicht/vorlesungsuebersicht/vorlesungsuebersicht.component';
import { LoginViewsComponent } from './login-views/login-views.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { UserRoleEnum } from './models/user';

//TODO: Routes je nach Login anpassen => Admin-/ Dozentensicht => data: { roles: [UserRoleEnum.Admin] }
const routes: Routes = [
  { path: '', component: WelcomebuttonsComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'login-views', component: LoginViewsComponent },
  //otherwise redirect to home
  // { path: '**', redirectTo: ''},
  //ADMIN-VIEW
  { path: 'willkommen', component: WelcomebuttonsComponent, data: { roles: [UserRoleEnum.Admin] }}, 
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'kurs-dozent-registrierung', component: KursDozentenRegistrierungComponent},
  { path: 'semester-anlegen', component: SemesteranlegenComponent },
  { path: 'dozenten-anlegen', component: DozentenanlegenComponent }, 
  { path: 'kurs-anlegen', component: KursanlegenComponent },
  { path: 'administration', component: AdministrationComponent},
  { path: 'vorlesung-anlegen', component: VorlesunganlegenComponent},
  { path: 'kursuebersicht', component: KursuebersichtComponent },
  { path: 'semesteruebersicht', component: SemesteruebersichtComponent },
  { path: 'adminkalender', component: AdminKalenderComponent },
//DOZENTEN-VIEW
  { path: 'dwelcome', component: DwelcomebuttonsComponent },
  { path: 'dozentenkalender', component: DozentenKalenderComponent },
  { path: 'vorlesungsuebersicht', component: VorlesungsuebersichtComponent },
  { path: 'stunden-warnung', component: StundenWarnungComponent },
//SHARED
{ path: 'kalenderansicht', component: KalenderComponent },

  // [canActivate => Implementieren, Prüfung Admin/ Berechtigung]
];
export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {enableTracing: false })
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
