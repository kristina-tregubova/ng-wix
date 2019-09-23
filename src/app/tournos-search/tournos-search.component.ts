import { Component, OnInit, DoCheck } from '@angular/core';
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

  items: any[];
  isLoading$: Observable<boolean>;
  isLogged$: Observable<IUser>;

  searchInput = document.getElementById('tournos-search-input');

  constructor(
    private tournosService: TournosSearchService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;
    this.tournosService.getUser();

    this.tournosService.searchTournaments().subscribe((val) => this.items = val);
    this.isLoading$ = this.tournosService.loading$;
  }

  trySearchByName($event) {
    this.tournosService.searchSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

  tryFilterByGame($event) {
    this.tournosService.gameSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

  tryFilterByStatus($event) {
    this.tournosService.statusSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

  tryFilterByMine($event) {
    this.tournosService.myTournamentsSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

  tryFilterByFavorite($event) {
    this.tournosService.myFavoritesSubject$.next($event);
    this.items = this.tournosService.getFilteredItems();
  }

}
