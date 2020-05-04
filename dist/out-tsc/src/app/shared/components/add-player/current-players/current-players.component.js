import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let CurrentPlayersComponent = class CurrentPlayersComponent {
    constructor() {
        this.removeChosenPlayer = new EventEmitter();
    }
    ngOnInit() {
    }
    handleRemoveChosenPlayers(player) {
        this.removeChosenPlayer.emit(player);
    }
};
tslib_1.__decorate([
    Input()
], CurrentPlayersComponent.prototype, "currentPlayers$", void 0);
tslib_1.__decorate([
    Output()
], CurrentPlayersComponent.prototype, "removeChosenPlayer", void 0);
CurrentPlayersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-current-players',
        templateUrl: './current-players.component.html',
        styleUrls: ['./current-players.component.scss']
    })
], CurrentPlayersComponent);
export { CurrentPlayersComponent };
//# sourceMappingURL=current-players.component.js.map