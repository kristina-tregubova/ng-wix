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

    loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    async trySignup(value) {
      await this.authService.signup(value);
    }

    async tryFacebookLogin() {
      await this.authService.facebookLogin();
    }

    async tryGoogleLogin() {
      await this.authService.googleLogin();
    }

    async tryLogin(value) {
      await this.authService.login(value);
    }
}
