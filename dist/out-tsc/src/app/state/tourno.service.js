import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
let TournoService = class TournoService {
    constructor(tournoStore, http) {
        this.tournoStore = tournoStore;
        this.http = http;
    }
    get() {
        return this.http.get('https://api.com').pipe(tap(entities => {
            this.tournoStore.set(entities);
        }));
    }
    add(tourno) {
        this.tournoStore.add(tourno);
    }
    update(id, tourno) {
        this.tournoStore.update(id, tourno);
    }
    remove(id) {
        this.tournoStore.remove(id);
    }
};
TournoService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], TournoService);
export { TournoService };
//# sourceMappingURL=tourno.service.js.map