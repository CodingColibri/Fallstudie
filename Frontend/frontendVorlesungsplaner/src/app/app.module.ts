import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
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

//Import Komponenten Vorlesungsplaner
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DozentenheaderComponent,
    BackgroundComponent,
    AdminheaderComponent,
    WelcomebuttonsComponent,
    DwelcomebuttonsComponent,
    DashboardbuttonsComponent,
    Kursanlegen1Component,
    Kursanlegen2Component,
    SemesteranlegenComponent,
    KalenderComponent,
    VorlesungEintragenComponent,
    DashboardbuttonsComponent,
    VorlesungsuebersichtComponent,
    StundenWarnungComponent
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
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [VorlesungEintragenComponent]
})
export class AppModule { }
