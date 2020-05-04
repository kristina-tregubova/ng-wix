import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let TournoCardComponent = class TournoCardComponent {
    constructor(tournoCardService, authService) {
        this.tournoCardService = tournoCardService;
        this.authService = authService;
    }
    ngOnInit() {
        this.isLogged$ = this.authService.userLoggedSubject$;
        if (this.authService.isUserLogged) {
            this.showFavorites();
        }
    }
    showFavorites() {
        this.isFavorite = this.tournoCardService.defineIfFavorite(this.item.id) ? true : false;
    }
    handleFavorite() {
        if (this.isFavorite) {
            this.isFavorite = false;
            this.tournoCardService.removeFromFavorite(this.item.id);
        }
        else {
            this.isFavorite = true;
            this.tournoCardService.addToFavorite(this.item.id);
        }
        console.log(this.isFavorite);
    }
};
tslib_1.__decorate([
    Input()
], TournoCardComponent.prototype, "item", void 0);
TournoCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tourno-card',
        templateUrl: './tourno-card.component.html',
        styleUrls: ['./tourno-card.component.scss'],
    })
], TournoCardComponent);
export { TournoCardComponent };
//# sourceMappingURL=tourno-card.component.js.map