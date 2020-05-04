import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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
    private authService: AuthService,
    private dialog: MatDialog
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

  // subject to refactoring
  public async trySignup(value: { email: string, password: string }): Promise<void> {
    const result = await this.authService.signup(value);
    if (result) {
      this.openSuccessDialog();
    }
  }

  public tryFacebookLogin(): void {
    this.authService.facebookLogin();
  }

  public tryGoogleLogin(): void {
    this.authService.googleLogin();
  }

  public tryLogin(value: { email: string, password: string }): void {
    this.authService.login(value);
  }

  private openSuccessDialog(): void {
    this.dialog.open(SuccessPopupComponent, { width: '450px' });
  }

  private passwordMatchValidator(g: FormGroup): Object {
    if (g.get('password').value !== g.get('confirmPassword').value) {
      g.get('confirmPassword').setErrors({
        mismatch: true
      });
      return { 'mismatch': true }
    }
  }

  public getEmailErrorMessage(): string {
    if (this.signupForm.controls.email.hasError('email')) {
      return 'Your email does not seem to be valid';
    } else if (this.signupForm.controls.email.hasError('required')) {
      return 'Your must enter an email';
    }
  }
  public getPasswordErrorMessage(): string {
    if (this.signupForm.controls.password.hasError('required')) {
      return 'You must enter a password';
    } else if (this.signupForm.controls.password.hasError('minlength')) {
      return 'Your password must contain at least 8 characters';
    }
  }

}
