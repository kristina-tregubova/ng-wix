import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let GameComponent = class GameComponent {
    constructor(route, playerService) {
        this.route = route;
        this.playerService = playerService;
        this.TournoWinnerEmitter = new EventEmitter();
    }
    ngOnInit() {
        this.tournoId = this.route.snapshot.paramMap.get('id');
        this.firstId = this.game.player1.id;
        this.secondId = this.game.player2.id;
        if (this.firstId) {
            this.playerService.getPlayer(this.firstId).subscribe((res) => {
                this.firstName = res.name;
            });
        }
        if (this.secondId) {
            this.playerService.getPlayer(this.secondId).subscribe((res) => {
                this.secondName = res.name;
            });
        }
        console.log(this.last);
    }
    ngDoCheck() {
        this.defineIfWinner();
    }
    defineIfWinner() {
        const res = (+this.game.player1.points - +this.game.player2.points) > 0;
        if (this.ifNotEmpty(this.firstName) && this.ifNotEmpty(this.secondName) && this.ifNotEmpty(this.game.player1.points) && this.ifNotEmpty(this.game.player2.points)) {
            if (res) {
                this.isFirstWinner = true;
                this.isSecondWinner = false;
                this.game.gameWinner = this.firstId;
                this.TournoWinnerEmitter.emit({ winner: this.firstId, loser: this.secondId });
            }
            else {
                this.isFirstWinner = false;
                this.isSecondWinner = true;
                this.game.gameWinner = this.secondId;
                this.TournoWinnerEmitter.emit({ winner: this.secondId, loser: this.firstId });
            }
        }
    }
    ifNotEmpty(val) {
        return (val === null || val === undefined) ? false : true;
    }
};
tslib_1.__decorate([
    Input()
], GameComponent.prototype, "game", void 0);
tslib_1.__decorate([
    Input()
], GameComponent.prototype, "isEditingDisabled", void 0);
tslib_1.__decorate([
    Input()
], GameComponent.prototype, "last", void 0);
tslib_1.__decorate([
    Output()
], GameComponent.prototype, "TournoWinnerEmitter", void 0);
GameComponent = tslib_1.__decorate([
    Component({
        selector: 'app-game',
        templateUrl: './game.component.html',
        styleUrls: ['./game.component.scss'],
    })
], GameComponent);
export { GameComponent };
//# sourceMappingURL=game.component.js.map