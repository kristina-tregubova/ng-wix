import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let SuccessPopupComponent = class SuccessPopupComponent {
    constructor(dialogRef, router) {
        this.dialogRef = dialogRef;
        this.router = router;
    }
    onOkClicked() {
        this.dialogRef.close();
        this.router.navigate(['/tournos-search']);
    }
};
SuccessPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-success-popup',
        templateUrl: './success-popup.component.html',
        styleUrls: ['./success-popup.component.scss']
    })
], SuccessPopupComponent);
export { SuccessPopupComponent };
//# sourceMappingURL=success-popup.component.js.map