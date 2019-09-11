import { Component, OnInit } from '@angular/core';
import { TournosSearchService } from './tournos-search.service';
import { Observable, fromEvent } from 'rxjs';
import { ITourno } from '../core/models/ITourno';

@Component({
  selector: 'app-tournos-search',
  templateUrl: './tournos-search.component.html',
  styleUrls: ['./tournos-search.component.scss']
})
export class TournoSearchComponent implements OnInit {

  items$: Observable<ITourno[]>;
  isLoading$: Observable<boolean>;

  searchInput = document.getElementById('tournos-search-input');

  constructor(
    private tournosService: TournosSearchService
  ) {}

  ngOnInit() {
    this.items$ = this.tournosService.searchTournaments();
    this.isLoading$ = this.tournosService.loading$;
  }

  trySearchByName($event) {
    this.tournosService.searchSubject$.next($event);
    this.items$ = this.tournosService.searchByName();
  }

  tryFilterByGame($event) {
    this.tournosService.gameSubject$.next($event);
    this.items$ = this.tournosService.filterTournamentsByGame();
  }

  tryFilterByStatus($event) {
    this.tournosService.statusSubject$.next($event);
    this.items$ = this.tournosService.filterTournamentsByStatus();
  }


}
