import { Component, OnInit, OnDestroy } from '@angular/core';
import { TournosSearchService } from './tournos-search.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { IUser } from '../core/models/IUser';


@Component({
  selector: 'app-tournos-search',
  templateUrl: './tournos-search.component.html',
  styleUrls: ['./tournos-search.component.scss']
})
export class TournoSearchComponent implements OnInit, OnDestroy {

  isPageLoaded: boolean;

  items: any[];
  isLoading$: Observable<boolean>;
  isLogged$: Observable<IUser>;

  searchInput = document.getElementById('tournos-search-input');

  private searchSubscription: Subscription;

  constructor(
    private tournoSearchService: TournosSearchService,
    private authService: AuthService,
  ) { }

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

}
