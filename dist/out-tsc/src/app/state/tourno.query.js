import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
let TournoQuery = class TournoQuery extends QueryEntity {
    constructor(store) {
        super(store);
        this.store = store;
    }
};
TournoQuery = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], TournoQuery);
export { TournoQuery };
//# sourceMappingURL=tourno.query.js.map