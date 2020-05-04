import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SuccessPopupComponent } from '../../shared/popups/success-popup/success-popup.component';
let AuthComponent = class AuthComponent {
    constructor(authService, router, fb, dialog) {
        this.authService = authService;
        this.router = router;
        this.fb = fb;
        this.dialog = dialog;
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
    trySignup(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.signup(value);
            if (result) {
                this.openSuccessDialog();
            }
        });
    }
    tryFacebookLogin() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.facebookLogin();
        });
    }
    tryGoogleLogin() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.googleLogin();
        });
    }
    tryLogin(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.login(value);
        });
    }
    openSuccessDialog() {
        this.dialog.open(SuccessPopupComponent, { width: '450px' });
    }
    passwordMatchValidator(g) {
        if (g.get('password').value !== g.get('confirmPassword').value) {
            g.get('confirmPassword').setErrors({
                mismatch: true
            });
            return { 'mismatch': true };
        }
    }
    getEmailErrorMessage() {
        if (this.signupForm.controls.email.hasError('email')) {
            return ('Your email does not seem to be valid');
        }
        else if (this.signupForm.controls.email.hasError('required')) {
            return ('Your must enter an email');
        }
    }
    getPasswordErrorMessage() {
        if (this.signupForm.controls.password.hasError('required')) {
            return ('You must enter a password');
        }
        else if (this.signupForm.controls.password.hasError('minlength')) {
            return ('Your password must contain at least 8 characters');
        }
    }
};
AuthComponent = tslib_1.__decorate([
    Component({
        selector: 'app-auth',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.scss']
    })
], AuthComponent);
export { AuthComponent };
//# sourceMappingURL=auth.component.js.map