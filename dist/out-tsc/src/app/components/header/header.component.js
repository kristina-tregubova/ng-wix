import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.isLogged$ = this.authService.userLoggedSubject$;
    }
    tryLogout() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authService.logout();
        });
    }
};
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map