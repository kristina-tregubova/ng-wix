import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
let PlayersSearchComponent = class PlayersSearchComponent {
    constructor(playersSearchService, authService) {
        this.playersSearchService = playersSearchService;
        this.authService = authService;
    }
    ngOnInit() {
        this.isLogged$ = this.authService.userLoggedSubject$;
        this.searchSubscription = this.playersSearchService.searchPlayers().subscribe((val) => this.items = val);
        this.isLoading$ = this.playersSearchService.loading$;
    }
    trySearchByName($event) {
        this.playersSearchService.searchSubject$.next($event);
        this.items = this.playersSearchService.getFilteredItems();
    }
    tryFilterByGame($event) {
        this.playersSearchService.gameSubject$.next($event);
        this.items = this.playersSearchService.getFilteredItems();
    }
    tryFilterByCountry($event) {
        this.playersSearchService.countrySubject$.next($event);
        this.items = this.playersSearchService.getFilteredItems();
    }
    tryFilterByMine($event) {
        this.playersSearchService.myPlayersSubject$.next($event);
        this.items = this.playersSearchService.getFilteredItems();
    }
    tryFilterByFavorite($event) {
        this.playersSearchService.myFavoritesSubject$.next($event);
        this.items = this.playersSearchService.getFilteredItems();
    }
    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }
};
PlayersSearchComponent = tslib_1.__decorate([
    Component({
        selector: 'app-players-search',
        templateUrl: './players-search.component.html',
        styleUrls: ['./players-search.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PlayersSearchComponent);
export { PlayersSearchComponent };
//# sourceMappingURL=players-search.component.js.map