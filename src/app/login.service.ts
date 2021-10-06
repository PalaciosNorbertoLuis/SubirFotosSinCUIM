import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable(
  {providedIn: 'root'}
)


export class LoginService {

  constructor(private route:Router) { }
  
  //user:string, password:string

  login(loginInfo:FormGroup){
     if (loginInfo.value.user === "Masche" && loginInfo.value.password === "Masche"){
      console.log(loginInfo.value);
       this.route.navigate(['/']);
     }else{
      console.log(loginInfo.value);
    }

  }

  logout(){}
  getCurrentUser(){}

}
