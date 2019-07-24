import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireFunctionsModule,
  FUNCTIONS_REGION,
  FunctionsRegionToken,
  FUNCTIONS_ORIGIN
} from '@angular/fire/functions';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule
  ],
  providers: [
    { provide: FUNCTIONS_REGION, useValue: 'europe-west1' },
    { provide: FunctionsRegionToken, useValue: 'europe-west1' },
    {
      provide: FUNCTIONS_ORIGIN,
      useValue: 'http://localhost:5000'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
