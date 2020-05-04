import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let PlayerCardComponent = class PlayerCardComponent {
    constructor(playerService, playerCardService, authService) {
        this.playerService = playerService;
        this.playerCardService = playerCardService;
        this.authService = authService;
        this.showBtns = true;
    }
    ngOnInit() {
        this.isLogged$ = this.authService.userLoggedSubject$;
        if (this.authService.isUserLogged) {
            this.showFavorites();
        }
        this.playerService.updatePlayerInfo(this.item);
    }
    showFavorites() {
        this.isFavorite = this.playerCardService.defineIfFavorite(this.item.id) ? true : false;
    }
    handleFavorite() {
        if (this.isFavorite) {
            this.isFavorite = false;
            this.playerCardService.removeFromFavorite(this.item.id);
        }
        else {
            this.isFavorite = true;
            this.playerCardService.addToFavorite(this.item.id);
        }
    }
};
tslib_1.__decorate([
    Input()
], PlayerCardComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input()
], PlayerCardComponent.prototype, "showBtns", void 0);
PlayerCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-player-card',
        templateUrl: './player-card.component.html',
        styleUrls: ['./player-card.component.scss'],
    })
], PlayerCardComponent);
export { PlayerCardComponent };
//# sourceMappingURL=player-card.component.js.map