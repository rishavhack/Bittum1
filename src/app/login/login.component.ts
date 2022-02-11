import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private notifyService : NotificationService,
  	private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      if(sessionStorage.getItem('token')){
        sessionStorage.removeItem('token')
      }
  	}


  ngOnInit() {
  	// setup the loginform and validators
    this.loginForm = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required ],
    });
  }

  ngOnDestroy() {}
  onSubmit() {
  	let obj = {
  		email: this.loginForm.controls.email.value,
  		password: this.loginForm.controls.password.value
  	}
     this.authenticationService.checkLoginUser(obj).subscribe(
      res => {
        this.notifyService.showSuccess("Login Successful", "Success")
        this.router.navigate(['welcome'])
      },err=>{
        this.loginForm.reset()
        this.notifyService.showError(err.error.error, "Error")
      }
    )
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator() {
    return false;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator() {
    return false;
  }
  ha(a:any){
  	console.log(a)
  }

}
