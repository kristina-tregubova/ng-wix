import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../shared/popups/success-popup/success-popup.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  resultMessage: string;

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

  // ngOnInit() {
  //   this.authService.errorMessage$.subscribe((res) => {
  //     this.resultMessage = res;
  //     console.log(res)
  //   })
  // }

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

}
