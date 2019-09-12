import { Component, OnInit } from '@angular/core';
import { PlayersSearchService } from './players-search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-players-search',
  templateUrl: './players-search.component.html',
  styleUrls: ['./players-search.component.scss']
})
export class PlayersSearchComponent implements OnInit {

  items$: Observable<any>;
  isLoading$: Observable<boolean>; 

  constructor(
    private playersService: PlayersSearchService
  ) { }


  ngOnInit() {
    this.playersService.items$.subscribe((val) => this.items$ = of(val));
    this.playersService.searchPlayers();
    this.isLoading$ = this.playersService.loading$;
  }

  trySearchByName($event) {
    this.playersService.searchSubject$.next($event);
    this.playersService.searchByName();
  }

  tryFilterByGame($event) {
    this.playersService.gameSubject$.next($event);
    this.playersService.filterPlayersByGame();
  }

  tryFilterByCountry($event) {
    this.playersService.countrySubject$.next($event);
    this.playersService.filterPlayersByCountry();
  }

}
