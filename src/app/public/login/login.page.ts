import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  errorMessage:String;

  constructor( private authService : AuthenticationService, private http: HttpClient) { }

  ngOnInit() {
  }

  login(){
    //Username and password sent to server for validation
    this.http.post<any>('http://localhost:9000/login', 
    this.user, 
    {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    ).subscribe(result =>{
          console.log("post result: ", result);
          if(result.success == "true"){
            this.authService.login(result.token);
            this.errorMessage = "";
          }else{
            this.errorMessage = "Invalid username or password";
          }
    });
  }

}
