import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
// import { ErrorAreaComponent } from '../shared/error-area/error-area.component';

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
    private fb: FormBuilder,
    public dialog: MatDialog
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
    const result = await this.authService.signup(value);
    if (result) {
      this.openSuccessDialog();
    } else {
      this.sendSigninErrorMessage();
    }
  }

  async tryFacebookLogin() {
    const result = await this.authService.facebookLogin();
    if (!result) {
      this.sendSigninErrorMessage();
    }
  }

  async tryGoogleLogin() {
    const result = await this.authService.googleLogin();
    if (!result) {
      this.sendSigninErrorMessage();
    }
  }

  async tryLogin(value) {
    const result = await this.authService.login(value);
    if (!result) {
      this.sendSigninErrorMessage();
    }
  }

  openSuccessDialog() {
    this.dialog.open(SuccessPopupComponent, { width: '450px' });
  }

  sendSigninErrorMessage() {
    this.authService.showErrorMessage('You are already signed in. Firstly, log out and try again.');
  }
}
