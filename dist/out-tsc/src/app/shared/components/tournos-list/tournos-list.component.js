import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let TournosListComponent = class TournosListComponent {
    constructor() {
        this.showEnd = 6;
        this.ifShowMoreBtn = true;
    }
    ngOnChanges() {
        if (this.items) {
            this.ifShowMoreBtn = (this.showEnd >= this.items.length) ? false : true;
        }
    }
    handleShowMore() {
        if (this.showEnd <= this.items.length) {
            this.ifShowMoreBtn = true;
            this.showEnd += 3;
            if (this.showEnd >= this.items.length) {
                this.ifShowMoreBtn = false;
            }
        }
    }
};
tslib_1.__decorate([
    Input()
], TournosListComponent.prototype, "items", void 0);
tslib_1.__decorate([
    Input()
], TournosListComponent.prototype, "isLoading$", void 0);
TournosListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tournos-list',
        templateUrl: './tournos-list.component.html',
        styleUrls: ['./tournos-list.component.scss'],
    })
], TournosListComponent);
export { TournosListComponent };
//# sourceMappingURL=tournos-list.component.js.map