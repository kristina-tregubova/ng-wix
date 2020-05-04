import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ErrorAreaComponent = class ErrorAreaComponent {
    constructor(auth) {
        this.auth = auth;
    }
    ngOnInit() {
        this.auth.errorMessage$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
        });
    }
};
ErrorAreaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-error-area',
        templateUrl: './error-area.component.html',
        styleUrls: ['./error-area.component.scss']
    })
], ErrorAreaComponent);
export { ErrorAreaComponent };
//# sourceMappingURL=error-area.component.js.map