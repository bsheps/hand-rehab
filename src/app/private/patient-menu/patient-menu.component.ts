import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IPatient } from '../patientInterface';

@Component({
  selector: 'app-patient-menu',
  templateUrl: './patient-menu.component.html',
  styleUrls: ['./patient-menu.component.scss']
})
export class PatientMenuComponent implements OnInit {
  patient : IPatient = { id: null, name: null};

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
    this.patient.name = this.activatedRoute.snapshot.queryParamMap.get('patient');
    this.patient.id = Number(this.activatedRoute.snapshot.queryParamMap.get('id'));
    console.log("patient: "+ JSON.stringify(this.patient))
  }

  selection(option){

    let navigationExtras: NavigationExtras = {
      queryParams:{
        patient : this.patient.name,
        id: this.patient.id
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
