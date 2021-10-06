import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login.service';


@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit{

  // formLogin = new FormGroup({
  //   user: new FormControl(''),
  //   password: new FormControl(''),
  // })
  formLogin: FormGroup;


  constructor(private loginService:LoginService,
              private fb: FormBuilder) { }
  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void{
     this.formLogin = this.fb.group({
       user: ['', [Validators.required]],
       password: ['', [Validators.required, Validators.minLength(6)]]
     })
   }


  onLogin():void{
    if (this.formLogin.valid){
      //console.log(this.formLogin.value);
      this.loginService.login(this.formLogin);
    }else{
      console.log(this.formLogin.errors)
    }

    // const user = this.formLogin.value.user;
    // const password = this.formLogin.value.password;
    // console.log (user + password);
    //this.loginService.logueo(user,password);
  }

}
