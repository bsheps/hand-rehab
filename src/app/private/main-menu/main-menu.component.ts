import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { LogoutPopoverComponent } from './logout-popover/logout-popover.component';
import { IPatient } from '../patientInterface';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  
  patientList: IPatient[];

  constructor(private http: HttpClient, 
              private router: Router, 
              public actionSheetController: ActionSheetController, 
              public toastController: ToastController, 
              public popoverController: PopoverController) { }

  ngOnInit() {
    this.http.get("../../assets/dummyMenuData.json").subscribe(data =>{
      this.patientList = data['patient'];
    })
  }

  patientSelected(patient){
    console.log("Patient selected: " + patient.name);
    let navigationExtras: NavigationExtras = {
          queryParams:{
            patient : patient.name,
            id: patient.id
          }
  };
    this.router.navigate(['/patientMenu'], navigationExtras);
  }

  async presentActionSheet(patient) {
    let navigationExtras: NavigationExtras = {
      queryParams:{
        patient : patient.name,
        id: patient.id
      }
    }
    const actionSheet = await this.actionSheetController.create({
      header: patient.name,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          //TODO: delete a patient
        }
      }, {
        text: 'Exercises',
        icon: 'md-hand',
        handler: () => {
          console.log('Exercises clicked');
          this.router.navigate(['/exercises'], navigationExtras);
        }
      }, {
        text: 'History',
        icon: 'ios-archive',
        handler: () => {
          console.log('History clicked');
          this.router.navigate(['/history'], navigationExtras);
        }
      }, {
        text: 'Advice',
        icon: 'ios-bulb',
        handler: () => {
          console.log('Advice clicked');
          this.router.navigate(['/advice'], navigationExtras);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async showToast(displayMessage: string, displayColor: string, displayDuration?: number) {
    const toast = await this.toastController.create({
      message: displayMessage,
      showCloseButton: true,
      position: 'bottom',
      duration: displayDuration,
      color: displayColor,
      closeButtonText: 'Done'
    });
    toast.present();
  }

  async presentLogoutPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LogoutPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  pairClicked(){
    console.log("pair clicked.");
    //TODO: bluetooth connection happens here and toast
    // displays the result
    this.showToast("Pair Successful", "medium", 2000); 
  }



}
