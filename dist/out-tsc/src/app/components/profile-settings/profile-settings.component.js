import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DeletePopupComponent } from 'src/app/shared/popups/delete-popup/delete-popup.component';
let ProfileSettingsComponent = class ProfileSettingsComponent {
    constructor(auth, dialog) {
        this.auth = auth;
        this.dialog = dialog;
        this.myForm = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl('')
        }, this.passwordMatchValidator);
    }
    ngOnInit() {
        this.ifHidePassChange = this.auth.checkIfSocial();
    }
    passwordMatchValidator(g) {
        if (g.get('password').value !== g.get('confirmPassword').value) {
            g.get('confirmPassword').setErrors({
                mismatch: true
            });
            return { 'mismatch': true };
        }
    }
    handleUpdatePassword() {
        this.auth.updatePassword(this.myForm.get('password').value);
    }
    handleOpenDeletePopup() {
        this.dialog.open(DeletePopupComponent, {
            width: '450px',
            data: {
                collectionName: 'users',
                itemId: null
            }
        });
    }
};
ProfileSettingsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profile-settings',
        templateUrl: './profile-settings.component.html',
        styleUrls: ['./profile-settings.component.scss']
    })
], ProfileSettingsComponent);
export { ProfileSettingsComponent };
//# sourceMappingURL=profile-settings.component.js.map