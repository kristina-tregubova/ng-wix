import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let AddPlayerComponent = class AddPlayerComponent {
    constructor(afs) {
        this.afs = afs;
        this.items$ = null; // current players
        this.ifRandom = new EventEmitter();
        this.chosenPlayers$ = new BehaviorSubject([]);
        this.relatedPlayers = new EventEmitter();
        this.newRefArray = [];
        // searchedPlayers: Array<IPlayer>;
        this.showAddNew = false;
    }
    ngOnInit() {
        this.chosenPlayers$.subscribe(val => {
            this.newArray = [...val];
        });
    }
    handleChangeView() {
        this.showAddNew = !this.showAddNew;
    }
    getPlayerRef(player) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.afs.doc('players/' + player.id).ref;
        });
    }
    handleAddPlayerToList(player) {
        this.newArray.push(player);
        this.getPlayerRef(player)
            .then((ref) => {
            this.newRefArray.push(ref);
            return this.newRefArray;
        })
            .then((arr) => {
            this.relatedPlayers.emit(arr);
        });
        this.chosenPlayers$.next(this.newArray);
    }
    handleRemovePlayerFromList(player) {
        let index = this.newArray.indexOf(player);
        if (index > -1) {
            this.newArray.splice(index, 1);
        }
        this.getPlayerRef(player)
            .then((ref) => {
            this.newRefArray = this.newRefArray.filter((val) => {
                return val.id !== ref.id;
            });
            this.relatedPlayers.emit(this.newRefArray);
        });
        this.chosenPlayers$.next(this.newArray);
    }
};
tslib_1.__decorate([
    Input()
], AddPlayerComponent.prototype, "items$", void 0);
tslib_1.__decorate([
    Input()
], AddPlayerComponent.prototype, "participants", void 0);
tslib_1.__decorate([
    Input()
], AddPlayerComponent.prototype, "tournoInfo", void 0);
tslib_1.__decorate([
    Output()
], AddPlayerComponent.prototype, "ifRandom", void 0);
tslib_1.__decorate([
    Output()
], AddPlayerComponent.prototype, "relatedPlayers", void 0);
AddPlayerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-player',
        templateUrl: './add-player.component.html',
        styleUrls: ['./add-player.component.scss']
    })
], AddPlayerComponent);
export { AddPlayerComponent };
//# sourceMappingURL=add-player.component.js.map