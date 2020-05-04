import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
let TournoSearchComponent = class TournoSearchComponent {
    constructor(tournoSearchService, authService) {
        this.tournoSearchService = tournoSearchService;
        this.authService = authService;
        this.searchInput = document.getElementById('tournos-search-input');
    }
    ngOnInit() {
        this.isLogged$ = this.authService.userLoggedSubject$;
        this.searchSubscription = this.tournoSearchService.searchTournaments().subscribe((val) => this.items = val);
        this.isLoading$ = this.tournoSearchService.loading$;
    }
    trySearchByName($event) {
        this.tournoSearchService.searchSubject$.next($event);
        this.items = this.tournoSearchService.getFilteredItems();
    }
    tryFilterByGame($event) {
        this.tournoSearchService.gameSubject$.next($event);
        this.items = this.tournoSearchService.getFilteredItems();
    }
    tryFilterByStatus($event) {
        this.tournoSearchService.statusSubject$.next($event);
        this.items = this.tournoSearchService.getFilteredItems();
    }
    tryFilterByMine($event) {
        this.tournoSearchService.myTournamentsSubject$.next($event);
        this.items = this.tournoSearchService.getFilteredItems();
    }
    tryFilterByFavorite($event) {
        this.tournoSearchService.myFavoritesSubject$.next($event);
        this.items = this.tournoSearchService.getFilteredItems();
    }
    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }
};
TournoSearchComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tournos-search',
        templateUrl: './tournos-search.component.html',
        styleUrls: ['./tournos-search.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], TournoSearchComponent);
export { TournoSearchComponent };
//# sourceMappingURL=tournos-search.component.js.map