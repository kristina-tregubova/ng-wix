import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
let PlayersSearchService = class PlayersSearchService {
    constructor(afs, authService) {
        this.afs = afs;
        this.authService = authService;
        this.countrySubject$ = new BehaviorSubject(null);
        this.gameSubject$ = new BehaviorSubject(null);
        this.searchSubject$ = new BehaviorSubject(null);
        this.myPlayersSubject$ = new BehaviorSubject(false);
        this.myFavoritesSubject$ = new BehaviorSubject(false);
        this._loading = new BehaviorSubject(false);
        this.loading$ = this._loading.asObservable();
        // this.user = this.authService.getUserLogged;
    }
    searchPlayers() {
        this.startLoading();
        const result = this.afs.collection('players').snapshotChanges().pipe(map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return Object.assign({ id }, data);
            });
        }), tap((res) => {
            this.initialItems = res;
            this.getCreatorIds();
        }), tap(() => this.stopLoading()));
        this.initialItems = this.items;
        return result;
    }
    getFilteredItems() {
        this.startLoading();
        let name;
        let game;
        let country;
        let showOnlyMine;
        let showFavorite;
        this.searchSubject$.subscribe(val => {
            if (val) {
                name = val.toLowerCase();
            }
        });
        this.gameSubject$.subscribe(val => {
            if (val) {
                game = val;
            }
        });
        this.countrySubject$.subscribe(val => {
            if (val) {
                country = val;
            }
        });
        this.myPlayersSubject$.subscribe(val => {
            if (val) {
                showOnlyMine = val;
            }
        });
        this.myFavoritesSubject$.subscribe(val => {
            if (val) {
                showFavorite = val;
            }
        });
        this.items = this.initialItems
            .filter((item) => {
            if (name) {
                return item.name.toLowerCase().includes(name);
            }
            else {
                return item.name;
            }
        })
            .filter((item) => {
            if (game) {
                return item.game === game;
            }
            else {
                return item.game;
            }
        })
            .filter((item) => {
            if (country) {
                return item.country === country;
            }
            else {
                return item.country;
            }
        })
            .filter((item) => {
            if (showOnlyMine) {
                return item.userCreatedId === this.authService.getUserLogged.uid;
            }
            else {
                return item;
            }
        })
            .filter((item) => {
            if (showFavorite) {
                return this.authService.getUserLogged.favoritePlayers.includes(item.id);
            }
            else {
                return item;
            }
        });
        this.stopLoading();
        return this.items;
    }
    getCreatorIds() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.initialItems) {
                yield this.initialItems.forEach((item) => {
                    if (item.userCreated) {
                        item.userCreated.get()
                            .then((doc) => {
                            if (doc.exists) {
                                item['userCreatedId'] = doc.id;
                            }
                        });
                    }
                });
            }
        });
    }
    startLoading() {
        this._loading.next(true);
    }
    stopLoading() {
        this._loading.next(false);
    }
};
PlayersSearchService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PlayersSearchService);
export { PlayersSearchService };
//# sourceMappingURL=players-search.service.js.map