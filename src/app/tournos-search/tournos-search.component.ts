import { Component, OnInit } from '@angular/core';
import { TournosSearchService } from './tournos-search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournos-search',
  templateUrl: './tournos-search.component.html',
  styleUrls: ['./tournos-search.component.scss']
})
export class TournoSearchComponent implements OnInit {

  items$: Observable<any>;
  isLoading$: Observable<boolean>; 

  constructor(
    private tournosService: TournosSearchService
  ) { }

  
  ngOnInit() {
    this.items$ = this.tournosService.searchTournaments();
    this.isLoading$ = this.tournosService.loading$;
    this.tournosService.sortTournamentsByGame();
  }

  updateSearch($event) {
    this.tournosService.searchSubject$.next($event);
  }

  filterByGame($event) {
    this.tournosService.gameSubject$.next($event);
  }

  filterByStatus($event) {
    this.tournosService.statusSubject$.next($event);
  }


}
