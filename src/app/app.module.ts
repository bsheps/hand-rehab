import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from '../app/services/auth-route-guard';
import { LoginPageModule } from '../app/public/login/login.module';
import { MainMenuComponent } from './private/main-menu/main-menu.component';
import { PatientMenuComponent } from './private/patient-menu/patient-menu.component';
import { ExercisesComponent } from './private/exercises/exercises.component';
import { HistoryComponent } from './private/history/history.component';
import { AdviceComponent } from './private/advice/advice.component';
import { LogoutPopoverComponent } from './private/main-menu/logout-popover/logout-popover.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, PatientMenuComponent, ExercisesComponent, HistoryComponent, AdviceComponent, LogoutPopoverComponent],
  entryComponents: [LogoutPopoverComponent],
  imports: [BrowserModule, 
            HttpClientModule,
            IonicModule.forRoot(), 
            AppRoutingModule, 
            LoginPageModule
  ],
  providers: [
    StatusBar,
    BluetoothSerial,
    SplashScreen,
    AuthGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
