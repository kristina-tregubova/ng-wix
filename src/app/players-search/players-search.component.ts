import { Component, OnInit } from '@angular/core';
import { PlayersSearchService } from './players-search.service';
import { Observable, of } from 'rxjs';
import { IPlayer } from '../core/models/IPlayer';

@Component({
  selector: 'app-players-search',
  templateUrl: './players-search.component.html',
  styleUrls: ['./players-search.component.scss']
})
export class PlayersSearchComponent implements OnInit {

  items: any[];
  isLoading$: Observable<boolean>;

  constructor(
    private playersService: PlayersSearchService
  ) { }


  ngOnInit() {
    this.playersService.searchPlayers().subscribe((val) => this.items = val);
    this.isLoading$ = this.playersService.loading$;
  }

  trySearchByName($event) {
    this.playersService.searchSubject$.next($event);
    this.items = this.playersService.getFilteredItems();
    // this.playersService.searchByName();
  }

  tryFilterByGame($event) {
    this.playersService.gameSubject$.next($event);
    this.items = this.playersService.getFilteredItems();
    // this.playersService.filterPlayersByGame();
  }

  tryFilterByCountry($event) {
    this.playersService.countrySubject$.next($event);
    this.items = this.playersService.getFilteredItems();
    // this.playersService.filterPlayersByCountry();
  }

}
