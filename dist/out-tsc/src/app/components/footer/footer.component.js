import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FooterComponent = class FooterComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
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
FooterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.scss']
    })
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map