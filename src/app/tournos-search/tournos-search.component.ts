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
  }

  updateSearch($event) {
    this.tournosService.startAtSubject$.next($event);
    this.tournosService.endAtSubject$.next($event + '\uf8ff');
  }

  filterByGame($event) {
    this.tournosService.gameSubject$.next($event);
  }

  filterByStatus($event) {
    this.tournosService.statusSubject$.next($event);
  }


}
