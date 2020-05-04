import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { TournosSearchService } from './tournos-search.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/IUser';


@Component({
  selector: 'app-tournos-search',
  templateUrl: './tournos-search.component.html',
  styleUrls: ['./tournos-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournoSearchComponent implements OnInit, OnDestroy {

  isPageLoaded: boolean;

  items: any[];
  isLoading$: Observable<boolean>;
  isLogged$: Observable<IUser>;

  @ViewChild("tournoSearchInput", { static: false }) private searchInput: ElementRef;

  private searchSubscription: Subscription;

  constructor(
    private tournoSearchService: TournosSearchService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;
    this.searchSubscription = this.tournoSearchService.searchTournaments().subscribe((val) => this.items = val);
    this.isLoading$ = this.tournoSearchService.loading$;
  }

  public trySearchByName(value: string): void {
    this.tournoSearchService.searchSubject$.next(value);
    this.items = this.tournoSearchService.getFilteredItems();
  }

  public tryFilterByGame(value: string): void {
    this.tournoSearchService.gameSubject$.next(value);
    this.items = this.tournoSearchService.getFilteredItems();
  }

  public tryFilterByStatus(value: string): void {
    this.tournoSearchService.statusSubject$.next(value);
    this.items = this.tournoSearchService.getFilteredItems();
  }

  public tryFilterByMine(value: boolean): void {
    this.tournoSearchService.myTournamentsSubject$.next(value);
    this.items = this.tournoSearchService.getFilteredItems();
  }

  public tryFilterByFavorite(value: boolean): void {
    this.tournoSearchService.myFavoritesSubject$.next(value);
    this.items = this.tournoSearchService.getFilteredItems();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
