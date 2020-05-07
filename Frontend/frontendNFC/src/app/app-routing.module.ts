import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NfcInformationComponent } from './nfc-information/nfc-information.component';
import { NfcTagComponent } from './nfc-tag/nfc-tag.component';


const routes: Routes = [

  { path: '', component: NfcInformationComponent},
  { path: 'nfctag', component: NfcTagComponent},

];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {enableTracing: false })
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
