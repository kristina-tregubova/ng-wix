import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let PlayersListComponent = class PlayersListComponent {
    constructor(playersSearchService) {
        this.playersSearchService = playersSearchService;
        this.order = false;
        this.showEnd = 10;
        this.ifShowMoreBtn = true;
    }
    handleSorting($event, field, sortType) {
        this.order = !this.order;
        this.playersSearchService.startLoading();
        if ($event) {
            document.querySelectorAll('.sorting-header button').forEach((el) => el.classList.remove('active-sorting'));
            $event.currentTarget.classList.add('active-sorting');
        }
        this.items.sort((a, b) => {
            if (sortType === 'letters') {
                console.log('tack');
                return (this.order) ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
            }
            else if (sortType === 'numbers') {
                console.log('tick');
                return (this.order) ? +a[field] - +b[field] : +b[field] - +a[field];
            }
        });
        this.playersSearchService.stopLoading();
    }
    ngOnChanges() {
        if (this.items) {
            this.ifShowMoreBtn = (this.showEnd >= this.items.length) ? false : true;
        }
    }
    handleShowMore() {
        if (this.showEnd <= this.items.length) {
            this.ifShowMoreBtn = true;
            this.showEnd += 5;
            if (this.showEnd >= this.items.length) {
                this.ifShowMoreBtn = false;
            }
        }
    }
};
tslib_1.__decorate([
    Input()
], PlayersListComponent.prototype, "items", void 0);
tslib_1.__decorate([
    Input()
], PlayersListComponent.prototype, "isLoading$", void 0);
PlayersListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-players-list',
        templateUrl: './players-list.component.html',
        styleUrls: ['./players-list.component.scss'],
    })
], PlayersListComponent);
export { PlayersListComponent };
//# sourceMappingURL=players-list.component.js.map