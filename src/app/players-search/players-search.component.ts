import { Component, OnInit } from '@angular/core';
import { PlayersSearchService } from './players-search.service';
import { Observable} from 'rxjs';
import { AuthService } from '../core/auth.service';
import { IUser } from '../core/models/IUser';

@Component({
  selector: 'app-players-search',
  templateUrl: './players-search.component.html',
  styleUrls: ['./players-search.component.scss']
})
export class PlayersSearchComponent implements OnInit {

  items: any[];
  isLoading$: Observable<boolean>;
  isLogged$: Observable<IUser>;

  constructor(
    private playersSearchService: PlayersSearchService,
    private authService: AuthService,
  ) { }


  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.playersSearchService.searchPlayers().subscribe((val) => this.items = val);
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

}
