import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registration = {
    username: '',
    password: ''
  }
  passwordVerify;
  postResponse: string;
  getResponse: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  createUser(){
    //#TODO
    //need to verify unique username and register user with server
    //so that they can get JWT 
  }

  testApiPost(){
    // this.http.get<any>('http://localhost:8080/greeting').subscribe(result =>{
    //   console.log("result = ", JSON.stringify(result));
    //   this.response = JSON.stringify(result);
    // })

    this.http.post<any>('http://localhost:9000/login', 
                        this.registration, 
                        {
                          headers: new HttpHeaders({
                            'Content-Type':  'application/json'
                          })
                        }
                        ).subscribe(result =>{
                              this.postResponse = JSON.stringify(result);
                        })
  }

  testApiGet(){
        this.http.get<any>('http://localhost:9000/testGet').subscribe(result =>{
      console.log("result = ", JSON.stringify(result));
      this.getResponse = JSON.stringify(result);
    })
  }
}
