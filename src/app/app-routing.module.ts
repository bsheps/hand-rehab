import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './private/main-menu/main-menu.component';
import { PatientMenuComponent } from './private/patient-menu/patient-menu.component';
import { ExercisesComponent } from './private/exercises/exercises.component';
import { HistoryComponent } from './private/history/history.component';
import { AdviceComponent } from './private/advice/advice.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren:  './public/login/login.module#LoginPageModule' },
  { path: 'menu', component: MainMenuComponent},
  { path: 'patientMenu', component: PatientMenuComponent },
  { path: 'exercises', component: ExercisesComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'advice', component: AdviceComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
