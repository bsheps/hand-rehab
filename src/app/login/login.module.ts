import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';

import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular'


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
    RouterModule.forChild([{ path: '', component: LoginPage }])
  ],
  declarations: [LoginPage],
  providers: [AmplifyService]
})
export class LoginPageModule {}