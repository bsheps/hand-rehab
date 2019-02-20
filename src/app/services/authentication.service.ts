/**
 * Authentication server handles all the 
 * login/ logout logic.
 */

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage'; //the TOKE_KEY will be placed into Storage
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'TokenPlaceholder,this variable will hold the JWT or whatever session token we use';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  // check if the user is already logged in
  // aka check storage, if a token already exists, then set authentication to true
  checkToken() {
    this.storage.get(TOKEN_KEY).then(result => {
      if (result) {
        this.authenticationState.next(true);
      }
    })
  }

  login() {
     //#TODO
     //login logic goes here
     
    return this.storage.set(TOKEN_KEY, 'The token goes here').then(() => {
      this.authenticationState.next(true);
    });
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated(): boolean {
    //returns whether the user is authenticated
    return this.authenticationState.value;
  }
}
