import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IPatient } from '../patientInterface';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  
  patient: IPatient = { id: null, name: null};

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.patient.name = this.activatedRoute.snapshot.queryParamMap.get('patient');
    this.patient.id = Number(this.activatedRoute.snapshot.queryParamMap.get('id'));
  }

}
