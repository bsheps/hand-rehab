import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatient } from '../patientInterface';
import { HttpClient } from '@angular/common/http';
import { IHistory } from './historyInterface';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  patient: IPatient= {
    PAT_ID: null,
    PAT_LNAME: null,
    PAT_FNAME: null,
    DOC_ID: null
  }
  // patient: IPatient;
  historyList: IHistory[];
  isDoctor: boolean;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
    this.patient.PAT_FNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_FNAME');
    this.patient.PAT_LNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_LNAME');
    this.patient.PAT_ID = Number(this.activatedRoute.snapshot.queryParamMap.get('PAT_ID'));

    this.http.get("../../assets/dummyHistoryData.json").subscribe( data =>{
      this.historyList = data['historyList'];
      this.isDoctor = data['isDoctor'];
      console.log("historyList: "+ JSON.stringify(data['historyList']));
    })
  }

  pairClicked(){
    console.log("pair clicked.");
    //TODO: bluetooth connection happens here and toast
    // displays the result
    this.showToast("Pair Successful", "medium", 1000); 
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
}
