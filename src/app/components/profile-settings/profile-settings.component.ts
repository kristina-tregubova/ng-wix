import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  myForm: FormGroup
  ifHidePassChange: boolean

  constructor(
    private auth: AuthService
  ) {
    this.myForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('')
    }, this.passwordMatchValidator);
  }

  ngOnInit() {
    this.ifHidePassChange = this.auth.checkIfSocial();
  }

  passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value !== g.get('confirmPassword').value) {
      g.get('confirmPassword').setErrors({
        mismatch: true
      });
      return { 'mismatch': true }
    }
  }

  handleUpdatePassword() {
    this.auth.updatePassword(this.myForm.get('password').value);
  }
}

