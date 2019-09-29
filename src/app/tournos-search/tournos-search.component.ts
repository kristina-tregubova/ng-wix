import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TournosSearchService } from './tournos-search.service';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { IUser } from '../core/models/IUser';


@Component({
  selector: 'app-tournos-search',
  templateUrl: './tournos-search.component.html',
  styleUrls: ['./tournos-search.component.scss']
})
export class TournoSearchComponent implements OnInit {

  isPageLoaded: boolean;

  items: any[];
  isLoading$: Observable<boolean>;
  isLogged$: Observable<IUser>;

  searchInput = document.getElementById('tournos-search-input');

  constructor(
    private tournoSearchService: TournosSearchService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.isLogged$ = this.authService.userLoggedSubject$;

    this.tournoSearchService.searchTournaments().subscribe((val) => this.items = val);
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

}
