import { Component, OnInit } from '@angular/core';
import { TournosSearchService } from './tournos-search.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournos-search',
  templateUrl: './tournos-search.component.html',
  styleUrls: ['./tournos-search.component.scss']
})
export class TournoSearchComponent implements OnInit {

  items$: Observable<any> 

  constructor(
    private tournosService: TournosSearchService
  ) { }

  
  ngOnInit() {
    this.items$ = this.tournosService.searchTournaments();
    console.log(this.items$);
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
