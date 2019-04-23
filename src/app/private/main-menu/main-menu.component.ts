import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { LogoutPopoverComponent } from './logout-popover/logout-popover.component';
import { IPatient } from '../patientInterface';
import { AmplifyService } from 'aws-amplify-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})

export class MainMenuComponent implements OnInit {
  
  patientList: IPatient[];
  loading:any; // for loading indicator
  user:any;    // user data

  constructor(private http: HttpClient, 
              private router: Router, 
              public actionSheetController: ActionSheetController, 
              public toastController: ToastController, 
              public popoverController: PopoverController,
              public amplifyService: AmplifyService,
              private loadingController: LoadingController) { }
              

  ngOnInit() {

    // This uses local dummy data. Save.
    // this.http.get("../../assets/dummyMenuData.json").subscribe(data =>{
    //   this.patientList = data['patient'];
    // });
    this.presentLoading();

    this.amplifyService.auth().currentUserInfo().then( data => {
      this.user = data; //will be used later for api when it's secured
      this.getPatientList();
    });
    
  }
  //  Save. This gets used for patient menu. (we may use that component in future)
  // patientSelected(patient){
  //   console.log("Patient selected: " + patient.name);
  //   let navigationExtras: NavigationExtras = {
  //         queryParams:{
  //           patient : patient.name,
  //           id: patient.id
  //         }
  // };
  //   this.router.navigate(['/patientMenu'], navigationExtras);
  // }

  async presentActionSheet(patient) {
    console.log("patient selected: "+ JSON.stringify(patient))
    let navigationExtras: NavigationExtras = {
      queryParams:{
        PAT_FNAME : patient.PAT_FNAME,
        PAT_LNAME: patient.PAT_LNAME,
        PAT_ID: patient.PAT_ID
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

  async presentLoading(){
    // displays a loading indicator
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await this.loading.present();
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

  getPatientList(){
    if (this.user){
      // Use AWS Amplify to get the list
      this.amplifyService.api().get('API', `/getpatients`, {}).then((res) => {
        if (res){
          this.patientList = res;
        } else {
          this.patientList = [];
        }
        this.loading.dismiss(); //dismiss loading indicator since data should be processed now
      })
      .catch((err) => {
        console.log(`Error getting list: ${err}`)
      })
    } else {
      console.log('Cannot get items: no active user')
    }
  }
}


