import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../shared/components/popups/success-popup/success-popup.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  resultMessage: string;
  signupForm: FormGroup;
  loginForm: FormGroup

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { 

  this.signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('')
  }, this.passwordMatchValidator);

  this.loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
}

  async trySignup(value) {
    const result = await this.authService.signup(value);
    if (result) {
      this.openSuccessDialog();
    }
  }

  async tryFacebookLogin() {
    const result = await this.authService.facebookLogin();
  }

  async tryGoogleLogin() {
    const result = await this.authService.googleLogin();
  }

  async tryLogin(value) {
    const result = await this.authService.login(value);
  }

  openSuccessDialog() {
    this.dialog.open(SuccessPopupComponent, { width: '450px' });
  }

  passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value !== g.get('confirmPassword').value) {
      g.get('confirmPassword').setErrors({
        mismatch: true
      });
      return { 'mismatch': true }
    }
  }

  getEmailErrorMessage() {
    if (this.signupForm.controls.email.hasError('email')) {
      return ('Your email does not seem to be valid')
    } else if (this.signupForm.controls.email.hasError('required')) {
      return ('Your must enter an email');
    }
  }
  getPasswordErrorMessage() {
    if(this.signupForm.controls.password.hasError('required')) {
     return ('You must enter a password');
    } else if (this.signupForm.controls.password.hasError('minlength')) {
      return ('Your password must contain at least 8 characters');
    } 
  }

}
