import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { LogoutPopoverComponent } from './logout-popover/logout-popover.component';
import { IPatient } from '../patientInterface';
import { AmplifyService } from 'aws-amplify-angular';

import { v4 as uuid } from 'uuid';

export class ToDoList {
  userId: any;
  items: Array<ToDoItem>

  constructor(params){
    this.items = params.items || [];
    this.userId = params.userId;
  }
}

export class ToDoItem {
  id: string;
  title: string;
  description: string;
  status: any;

  constructor(params){
    this.id = uuid();
    this.title = params.title;
    this.description = params.description;
    this.status = 'new';
  }
}


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})

export class MainMenuComponent implements OnInit {
  
  patientList: IPatient[];

  modal: any;
  data: any;
  user: any;
  itemList: any;

  constructor(private http: HttpClient, 
              private router: Router, 
              public actionSheetController: ActionSheetController, 
              public toastController: ToastController, 
              public popoverController: PopoverController,
              public amplifyService: AmplifyService) { }

  ngOnInit() {
    this.http.get("../../assets/dummyMenuData.json").subscribe(data =>{
      this.patientList = data['patient'];
    });
    this.amplifyService.auth().currentUserInfo().then( data => {
      // alert("user: "+ JSON.stringify(data));
      this.user = data;
      this.getItems();
    });
    
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

  getItems(){
    if (this.user){
      // Use AWS Amplify to get the list
      this.amplifyService.api().get('HelloWorldBrandon', `/test`, {}).then((res) => {
        console.log("getItems result: "+ JSON.stringify(res));
        if (res && res.length > 0){
          this.itemList = res[0];
        } else {
          this.itemList = new ToDoList({userId: this.user.id, items: []});
        }
      })
      .catch((err) => {
        console.log(`Error getting list: ${err}`)
      })
    } else {
      console.log('Cannot get items: no active user')
    }
  }
}


