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
    private playersService: PlayersSearchService,
    private authService: AuthService,
  ) { }


  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.playersService.searchPlayers().subscribe((val) => this.items = val);
    this.isLoading$ = this.playersService.loading$;
  }

  trySearchByName($event) {
    this.playersService.searchSubject$.next($event);
    this.items = this.playersService.getFilteredItems();
  }

  tryFilterByGame($event) {
    this.playersService.gameSubject$.next($event);
    this.items = this.playersService.getFilteredItems();
  }

  tryFilterByCountry($event) {
    this.playersService.countrySubject$.next($event);
    this.items = this.playersService.getFilteredItems();
  }

  tryFilterByMine($event) {
    this.playersService.myPlayersSubject$.next($event);
    this.items = this.playersService.getFilteredItems();
  }

  tryFilterByFavorite($event) {
    this.playersService.myFavoritesSubject$.next($event);
    this.items = this.playersService.getFilteredItems();
  }

}
