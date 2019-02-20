import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    username: "",
    password: ""
  }

  constructor( private authService : AuthenticationService) { }

  ngOnInit() {
  }

  login(){
    //Username and password need to be sent to server for validation
    this.authService.login();
  }

}
