import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IPatient } from '../patientInterface';

@Component({
  selector: 'app-patient-menu',
  templateUrl: './patient-menu.component.html',
  styleUrls: ['./patient-menu.component.scss']
})
export class PatientMenuComponent implements OnInit {
  patient: IPatient= {
    PAT_ID: null,
    PAT_LNAME: null,
    PAT_FNAME: null,
    DOC_ID: null
  }

  menuOptions = [
    {
      'value': 'Exercises',
      'icon': 'md-hand'
    },{
      'value': 'History',
      'icon': 'ios-archive'
    },
    {
      'value': 'Advice',
      'icon': 'ios-bulb'
    }
]
    
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.patient.PAT_FNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_FNAME');
    this.patient.PAT_LNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_LNAME');
    this.patient.PAT_ID = Number(this.activatedRoute.snapshot.queryParamMap.get('PAT_ID'));
    console.log("patient: "+ JSON.stringify(this.patient))
  }

  selection(option){

    let navigationExtras: NavigationExtras = {
      queryParams:{
        PAT_FNAME : this.patient.PAT_FNAME,
        PAT_LNAME : this.patient.PAT_LNAME,
        PAT_ID: this.patient.PAT_ID
      }
    };
    switch(option.value){
      case "Exercises":
        console.log("Exercise selected");
        this.router.navigate(['/exercises'], navigationExtras);
        break;
      case "History" : 
        console.log("History Selected");
        this.router.navigate(['/history'], navigationExtras);
        break;
      case "Advice" :
        console.log("Advice selected");
        this.router.navigate(['/advice'], navigationExtras);
        break;
      default :
        // do nothing
        break;
    }
  }
}
