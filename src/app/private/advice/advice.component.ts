import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IPatient } from '../patientInterface';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {

  // patient: IPatient;
  patient: IPatient= {
    PAT_ID: null,
    PAT_LNAME: null,
    PAT_FNAME: null,
    DOC_ID: null
  }
  getResponse: any;

  constructor(private activatedRoute: ActivatedRoute, private amplifyService:AmplifyService) { }

  ngOnInit() {
    this.patient.PAT_FNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_FNAME');
    this.patient.PAT_LNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_LNAME');
    this.patient.PAT_ID = Number(this.activatedRoute.snapshot.queryParamMap.get('PAT_ID'));
    this.amplifyService.api().get('API','/getalldoctor',{}).then(response =>{
      this.getResponse = JSON.stringify(response);
    })
  }
}
