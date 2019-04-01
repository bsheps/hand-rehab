import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatient } from '../patientInterface';
import { HttpClient } from '@angular/common/http';
import { IExercise } from './exerciseInterface';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  
  exerciseList: IExercise[];
  patient: IPatient = { id: null, name: null};
  isDoctor:boolean;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastController: ToastController ) { }

  ngOnInit() {
    this.patient.name = this.activatedRoute.snapshot.queryParamMap.get('patient');
    this.patient.id = Number(this.activatedRoute.snapshot.queryParamMap.get('id'));

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
