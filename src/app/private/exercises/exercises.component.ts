import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatient } from '../patientInterface';
import { HttpClient } from '@angular/common/http';
import { IExercise } from './exerciseInterface';
import { ToastController } from '@ionic/angular';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  
  exerciseList: IExercise[];
  patient: IPatient= {
    PAT_ID: null,
    PAT_LNAME: null,
    PAT_FNAME: null,
    DOC_ID: null
  }
  isDoctor:boolean;

  constructor(private activatedRoute: ActivatedRoute, 
              private http: HttpClient, 
              public toastController: ToastController, 
              private amplifyService:AmplifyService,
              private router: Router ) { }

  ngOnInit() {
    this.patient.PAT_FNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_FNAME');
    this.patient.PAT_LNAME = this.activatedRoute.snapshot.queryParamMap.get('PAT_LNAME');
    this.patient.PAT_ID = Number(this.activatedRoute.snapshot.queryParamMap.get('PAT_ID'));

    console.log("patient is: "+ JSON.stringify(this.patient));

    // this.amplifyService.api().post('API', `/exercisedetails`, {body: this.patient}).then(response =>{
    //   console.log("POST response was: " + JSON.stringify(response));
    //   let data = response['data'];
    //   this.exerciseList = data['exerciseList'];
    //   this.isDoctor     = data['isDoctor'];
    // }).catch((err) => {
    //   console.log(`Error getting exercise details: ${err}`)
    // });
    // Commenting this out, but should be saved. This calls local dummy data
    this.http.get("../../assets/dummyExerciseData.json").subscribe(data =>{
      this.exerciseList = data['exerciseList'];
      this.isDoctor     = data['isDoctor'];
      console.log("doctor: " +this.isDoctor)
    })
  }

  startClicked(exercise:IExercise){
    console.log("start Clicked. Serial data: " + exercise.serialData);
    this.showToast("Starting exercise", "medium", 1000);
  }

  stopClicked(){
    console.log("stop clicked.");
    this.showToast("Stopping exercise", "danger", 5000);
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

  pairClicked(){
    console.log("pair clicked.");
    //TODO: bluetooth connection happens here and toast
    // displays the result
    this.showToast("Pair Successful", "medium", 1000); 
  }

  toggleDr(){
    this.isDoctor = !this.isDoctor;
  }

  assign(exercise:IExercise){
    exercise.isAssigned = !exercise.isAssigned;
    this.showToast(exercise.isAssigned?("ASSIGNED: "+exercise.title):("REMOVED: "+exercise.title), "medium", 1000);
  }
  
}
