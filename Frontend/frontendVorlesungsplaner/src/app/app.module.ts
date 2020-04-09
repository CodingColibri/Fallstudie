import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

// used to create fake backend
import { fakeBackendProvider } from './helpers';

//Import Komponenten Vorlesungsplaner
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { BackgroundComponent } from './welcome-background/welcome-background.component';
import { DozentenheaderComponent } from './dozentensicht/dozentenheader/dozentenheader.component';
import { AdminheaderComponent } from './adminsicht/adminheader/adminheader.component'; 
import { WelcomebuttonsComponent } from './adminsicht/welcome-buttons/welcome-buttons.component';
import { DwelcomebuttonsComponent } from './dozentensicht/dwelcome-buttons/dwelcome-buttons.component';
import { AdminDashboardComponent } from './adminsicht/dashboard/dashboard.component';
import { KursanlegenComponent } from './adminsicht/kurs-anlegen/kurs-anlegen.component';
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
import { VorlesunganlegenComponent } from './adminsicht/vorlesung-anlegen/vorlesung-anlegen.component';
import { KursDozentenRegistrierungComponent } from './adminsicht/registierung/registrierung.component';
import { DozentenanlegenComponent } from './adminsicht/dozenten-anlegen/dozenten-anlegen.component';
import { AdministrationComponent } from './adminsicht/administration/administration.component';
import { SemesteruebersichtComponent } from './adminsicht/semesteruebersicht/semesteruebersicht.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DozentenheaderComponent,
    BackgroundComponent,
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
    SemesteruebersichtComponent
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
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider //TODO: Für echte API auskommentieren: Wo echte API angeben?!
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [VorlesungEintragenComponent]
})
export class AppModule { }
