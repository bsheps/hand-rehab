import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

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

  constructor( private router: Router, private popoverController: PopoverController ) { }

  ngOnInit() {
  }

  logout(){
    this.popoverController.dismiss();
    this.router.navigate(['/login']); 
  }

  dismiss(){
    this.popoverController.dismiss()
  }

}
