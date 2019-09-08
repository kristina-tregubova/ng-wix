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

  updateSearch($event) {
    this.playersService.startAtSubject$.next($event);
    this.playersService.endAtSubject$.next($event + '\uf8ff');
  }

  filterByGame($event) {
    this.playersService.gameSubject$.next($event);
  }

  filterByCountry($event) {
    this.playersService.countrySubject$.next($event);
  }

}
