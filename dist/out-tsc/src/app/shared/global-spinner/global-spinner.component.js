import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let GlobalSpinnerComponent = class GlobalSpinnerComponent {
    constructor() {
        this.visible = true;
    }
    ngOnInit() {
        setTimeout(() => (this.visible = false), 3000);
    }
};
GlobalSpinnerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-global-spinner',
        templateUrl: './global-spinner.component.html',
        styleUrls: ['./global-spinner.component.scss']
    })
], GlobalSpinnerComponent);
export { GlobalSpinnerComponent };
//# sourceMappingURL=global-spinner.component.js.map