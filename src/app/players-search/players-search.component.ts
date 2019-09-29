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
    private playerSearchService: PlayersSearchService,
    private authService: AuthService,
  ) { }


  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.playerSearchService.searchPlayers().subscribe((val) => this.items = val);
    this.isLoading$ = this.playerSearchService.loading$;
  }

  trySearchByName($event) {
    this.playerSearchService.searchSubject$.next($event);
    this.items = this.playerSearchService.getFilteredItems();
  }

  tryFilterByGame($event) {
    this.playerSearchService.gameSubject$.next($event);
    this.items = this.playerSearchService.getFilteredItems();
  }

  tryFilterByCountry($event) {
    this.playerSearchService.countrySubject$.next($event);
    this.items = this.playerSearchService.getFilteredItems();
  }

  tryFilterByMine($event) {
    this.playerSearchService.myPlayersSubject$.next($event);
    this.items = this.playerSearchService.getFilteredItems();
  }

  tryFilterByFavorite($event) {
    this.playerSearchService.myFavoritesSubject$.next($event);
    this.items = this.playerSearchService.getFilteredItems();
  }

}
