import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let BracketComponent = class BracketComponent {
    constructor() {
        this.TournoWinnerEmitter = new EventEmitter();
    }
    defineRoundType(i) {
        const index = i + 1;
        if (this.rounds.length === index) {
            this.roundType = 'finals';
        }
        else if ((this.rounds.length - 1) === index) {
            this.roundType = 'semifinals';
        }
        else if ((this.rounds.length - 2) === index) {
            this.roundType = 'quarterfinals';
        }
        else if ((this.rounds.length > 3) && index) {
            this.roundType = 'rounds';
        }
        return this.roundType;
    }
};
tslib_1.__decorate([
    Input()
], BracketComponent.prototype, "rounds", void 0);
tslib_1.__decorate([
    Input()
], BracketComponent.prototype, "isEditingDisabled", void 0);
tslib_1.__decorate([
    Output()
], BracketComponent.prototype, "TournoWinnerEmitter", void 0);
BracketComponent = tslib_1.__decorate([
    Component({
        selector: 'app-bracket',
        templateUrl: './bracket.component.html',
        styleUrls: ['./bracket.component.scss']
    })
], BracketComponent);
export { BracketComponent };
//# sourceMappingURL=bracket.component.js.map