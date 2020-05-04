import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let CanDeactivateGuard = class CanDeactivateGuard {
    canDeactivate(component) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
};
CanDeactivateGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CanDeactivateGuard);
export { CanDeactivateGuard };
//# sourceMappingURL=deactivate-guard.service.js.map