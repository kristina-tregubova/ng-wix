import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let AddFromListComponent = class AddFromListComponent {
    constructor(playersSearchService) {
        this.playersSearchService = playersSearchService;
        // @Input() searchedPlayers: Array<IPlayer>;
        this.newChosenPlayer = new EventEmitter();
        this.showEnd = 10;
        this.ifShowMoreBtn = true;
    }
    ngOnInit() {
        this.playersSearchService.searchPlayers().subscribe((val) => {
            this.searchedPlayers = val;
            // this.playersSearchService.myPlayersSubject$.next(true);
        });
    }
    trySearchByName($event) {
        this.playersSearchService.searchSubject$.next($event);
        this.searchedPlayers = this.playersSearchService.getFilteredItems();
    }
    handleAddChosenPlayers(player) {
        this.newChosenPlayer.emit(player);
    }
    handleShowMore() {
        if (this.showEnd <= this.searchedPlayers.length) {
            this.ifShowMoreBtn = true;
            this.showEnd += 2;
            if (this.showEnd >= this.searchedPlayers.length) {
                this.ifShowMoreBtn = false;
            }
        }
    }
};
tslib_1.__decorate([
    Output()
], AddFromListComponent.prototype, "newChosenPlayer", void 0);
AddFromListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-from-list',
        templateUrl: './add-from-list.component.html',
        styleUrls: ['./add-from-list.component.scss']
    })
], AddFromListComponent);
export { AddFromListComponent };
//# sourceMappingURL=add-from-list.component.js.map