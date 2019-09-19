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

  items: any[];
  isLoading$: Observable<boolean>;

  searchInput = document.getElementById('tournos-search-input');

  constructor(
    private tournosService: TournosSearchService
  ) {}

  ngOnInit() {
    this.tournosService.searchTournaments().subscribe((val) => this.items = val);
    this.isLoading$ = this.tournosService.loading$;
    this.tournosService.getUserId();
  }

  async trySearchByName($event) {
    this.tournosService.searchSubject$.next($event);
    this.items = await this.tournosService.getFilteredItems();
  }

  async tryFilterByGame($event) {
    this.tournosService.gameSubject$.next($event);
    this.items = await this.tournosService.getFilteredItems();
  }

  async tryFilterByStatus($event) {
    this.tournosService.statusSubject$.next($event);
    this.items = await this.tournosService.getFilteredItems();
  }

  async tryFilterByMine($event) {
    this.tournosService.myTournamentsSubject$.next($event);
    this.items = await this.tournosService.getFilteredItems();
  }

}
