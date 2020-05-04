import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let RoundComponent = class RoundComponent {
    constructor() {
        this.TournoWinnerEmitter = new EventEmitter();
    }
    ngDoCheck() {
        this.defineNextRoundCandidates(this.round);
    }
    defineNextRoundCandidates(round) {
        const newNextRoundCandidates = [];
        for (const game of round.games) {
            newNextRoundCandidates.push(game.gameWinner);
        }
        round.nextRoundCandidates = newNextRoundCandidates;
    }
};
tslib_1.__decorate([
    Input()
], RoundComponent.prototype, "round", void 0);
tslib_1.__decorate([
    Input()
], RoundComponent.prototype, "roundType", void 0);
tslib_1.__decorate([
    Input()
], RoundComponent.prototype, "isEditingDisabled", void 0);
tslib_1.__decorate([
    Input()
], RoundComponent.prototype, "last", void 0);
tslib_1.__decorate([
    Output()
], RoundComponent.prototype, "TournoWinnerEmitter", void 0);
RoundComponent = tslib_1.__decorate([
    Component({
        selector: 'app-round',
        templateUrl: './round.component.html',
        styleUrls: ['./round.component.scss']
    })
], RoundComponent);
export { RoundComponent };
//# sourceMappingURL=round.component.js.map