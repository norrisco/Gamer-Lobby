import { Component, OnInit }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { ITokenPayload } from "../token-payload";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  message: string;
  loginForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  credentials: ITokenPayload = {
    username: '',
    password: ''
  };

  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    ) 
    {
    this.setMessage();
  }
  ngOnInit(){
    this.validateForm();
  }

  validateForm(){
    this.loginForm = this.fb.group({
      username: [ [Validators.required]],
      password: [ [Validators.required]]
    })
  }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
      return this.loginForm.controls[controlName].hasError(errorName);
    }  



  setMessage() {
    this.message = '';
  }

  login() {
    this.message = 'Logging in...';

    if (this.loginForm.valid){
      try{
        this.authService.login(this.credentials.username, this.credentials.password).subscribe(() => {
          this.setMessage();
          if (this.authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : "/admin";
            
            // Redirect the user
            this.router.navigateByUrl(redirect);
          }
        });

      }catch (err){
        this.message = 'An unexpected error occured. Please try again.';
      }
    }else{
      this.message = 'Either the username or password is incorrect. Please try again.';
    }
  }
}