import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators,UntypedFormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit{
  loginForm: UntypedFormGroup;


  public loginError?:String;
  constructor(private loginService:LoginService, 
              private router:Router,
              private fb:UntypedFormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      user: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
    })
  
    this.loginService.isLoggedIn();
  }

  onSubmit(){  
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value)
      .subscribe((data) => {
        if(data.body?.hasOwnProperty('token')){
          this.router.navigate(['/']);
        }else{
            Swal.fire({
              icon: 'error',
              title: `<p style="color:black">${data.body?.mensaje}</p>`,
              showConfirmButton: false,
              timer: 2600,
              timerProgressBar: true,
            });
            this.ngOnInit();
            return;
        }        
      },
      error => this.loginError = error
      )
    }    
  }
}
