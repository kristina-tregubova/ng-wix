import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

    signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });

    trySignup(value){
      this.authService.signup(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
    }
}
