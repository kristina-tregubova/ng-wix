import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
let TournoStore = class TournoStore extends EntityStore {
    constructor() {
        super();
    }
};
TournoStore = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    StoreConfig({ name: 'tourno' })
], TournoStore);
export { TournoStore };
//# sourceMappingURL=tourno.store.js.map