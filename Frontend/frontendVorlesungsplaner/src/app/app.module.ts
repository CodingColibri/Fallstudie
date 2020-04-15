import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminheaderComponent } from './adminsicht/adminheader/adminheader.component';
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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KalenderComponent } from './calendar/calendar.component';
// used to create fake backend
//Import Komponenten Vorlesungsplaner
import { DozentenheaderComponent } from './dozentensicht/dozentenheader/dozentenheader.component';
import { DozentenKalenderComponent } from './dozentensicht/dozentenkalender/dozentenkalender.component';
import { DwelcomebuttonsComponent } from './dozentensicht/dwelcome-buttons/dwelcome-buttons.component';
import { StundenWarnungComponent } from './dozentensicht/stunden-warnung/stunden-warnung.component';
import { VorlesungEintragenComponent } from './dozentensicht/vorlesung-eintragen/vorlesung-eintragen.compontent';
import { VorlesungsuebersichtComponent } from './dozentensicht/vorlesungsuebersicht/vorlesungsuebersicht.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoginViewsComponent } from './login-views/login-views.component';
import { LoginComponent } from './login/login.component';
import { ToastComponent } from './toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DozentenheaderComponent,
    AdminheaderComponent,
    WelcomebuttonsComponent,
    DwelcomebuttonsComponent,
    AdminDashboardComponent,
    KursanlegenComponent,
    DozentenanlegenComponent,
    SemesteranlegenComponent,
    KalenderComponent,
    VorlesungEintragenComponent,
    VorlesungsuebersichtComponent,
    StundenWarnungComponent,
    DozentenKalenderComponent,
    AdminKalenderComponent,
    KursuebersichtComponent,
    LoginViewsComponent,
    AdministrationComponent,
    VorlesunganlegenComponent,
    KursDozentenRegistrierungComponent,
    SemesteruebersichtComponent,
    ToastComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDialogModule, 
    MatCheckboxModule, 
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider //TODO Für echte API auskommentieren
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [VorlesungEintragenComponent]
})
export class AppModule { }
