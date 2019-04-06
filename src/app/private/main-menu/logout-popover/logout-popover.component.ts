import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-logout-popover',
  template: `
     <div>Logout?</div>
    <ion-button (click)="logout()" color="danger">Yes</ion-button>
    <ion-button (click)="dismiss()">No</ion-button>
  `,
  styles: []
})
export class LogoutPopoverComponent implements OnInit {

  setLogout = {loggedIn: false};

  constructor( private router: Router, private popoverController: PopoverController, public events: Events ) { }

  ngOnInit() { }

  logout(){
    Auth.signOut()
    .then(data =>{
      console.log(data);
      this.events.publish('data:AuthState', this.setLogout);
      this.router.navigate(['/login']); 
    })
    .catch(err => console.log(err));
    
    this.popoverController.dismiss();  
  }

  dismiss(){
    this.popoverController.dismiss()
  }

}
