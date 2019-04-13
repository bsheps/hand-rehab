import { Component, AfterContentInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { AuthGuardService } from '../../services/auth-route-guard'
import { AmplifyService }  from 'aws-amplify-angular';
import { Router } from '@angular/router';


 @Component({
  selector: 'app-page-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements AfterContentInit{

   authState: any;
  // including AuthGuardService here so that it's available to listen to auth events
  authService: AuthGuardService
  amplifyService: AmplifyService
  signUpConfig: any;
  user: any;

   constructor(public events: Events, public guard: AuthGuardService, public amplify: AmplifyService, private router: Router
    ) {
    this.authState = {loggedIn: false};
    this.authService = guard;
    this.signUpConfig = {
      header: 'Welcome!',
      defaultCountryCode: '1',
      hideAllDefaults: true,
      signUpFields: [
        {
          label: 'Email',
          key: 'email',
          required: true,
          displayOrder: 1,
          type: 'email',
        },
        {
          label: 'Name',
          key: 'name',
          required: true,
          displayOrder: 2,
          type: 'string',
        },
        {
          label: 'Password',
          key: 'password',
          required: true,
          displayOrder: 4,
          type: 'password',
        },
        {
          label: 'Phone number',
          key: 'phone_number',
          required: false,
          displayOrder: -1,
          type: 'string',
        },
        {
          label: 'Username',
          key: 'username',
          required: true,
          displayOrder: 3,
          type: 'string',
        },
        {
          label: 'Are you a Doctor (y/n)',
          key: 'custom:isDoctorS',
          required: true,
          displayOrder: 4,
          type: 'string'
        }
      ]
    };
    this.amplifyService = amplify;
    this.amplifyService.authStateChange$
    .subscribe(authState => {
      this.authState.loggedIn = authState.state === 'signedIn';
      this.events.publish('data:AuthState', this.authState)

      if(this.authState.loggedIn){
        this.user = this.amplifyService.auth().currentUserInfo();
        this.router.navigateByUrl('/menu');
      }

    });
  }

   ngAfterContentInit(){
    this.events.publish('data:AuthState', this.authState)
  }

   login() {
    this.authState.loggedIn = true;
    this.events.publish('data:AuthState', this.authState)
  }

   logout() {
    this.authState.loggedIn = false;
    this.events.publish('data:AuthState', this.authState)
  }

 }