import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NfcTagComponent } from './nfc-tag/nfc-tag.component';
import { NfcInformationComponent } from './nfc-information/nfc-information.component';

@NgModule({
  declarations: [
    AppComponent,
    NfcTagComponent,
    NfcInformationComponent,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
