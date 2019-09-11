import { Component, OnInit } from '@angular/core';
import { PlayersSearchService } from './players-search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-players-search',
  templateUrl: './players-search.component.html',
  styleUrls: ['./players-search.component.scss']
})
export class PlayersSearchComponent implements OnInit {

  items$: Observable<any>
  isLoading$: Observable<boolean>; 

  constructor(
    private playersService: PlayersSearchService
  ) { }


  ngOnInit() {
    this.items$ = this.playersService.searchPlayers();
    this.isLoading$ = this.playersService.loading$;
  }

  trySearchByName($event) {
    this.playersService.searchSubject$.next($event);
    this.items$ = this.playersService.searchByName();
  }

  tryFilterByGame($event) {
    this.playersService.gameSubject$.next($event);
    this.items$ = this.playersService.filterPlayersByGame();
  }

  tryFilterByCountry($event) {
    this.playersService.countrySubject$.next($event);
    this.items$ = this.playersService.filterPlayersByCountry();
  }

}
