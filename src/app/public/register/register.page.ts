import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registration = {
    username: '',
    password: '',
    passwordVerify: ''
  }

  constructor() { }

  ngOnInit() {
  }

  passwordVerify(){
    
  }

  createUser(){
    //#TODO
    //need to verify unique username and register user with cloud
    //so that they can get JWT 
  }

}
