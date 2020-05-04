import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PlayersSearchService } from './players-search.service';
import { Observable, Subscription} from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/IUser';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Component({
  selector: 'app-players-search',
  templateUrl: './players-search.component.html',
  styleUrls: ['./players-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayersSearchComponent implements OnInit, OnDestroy {

  items: IPlayer[];
  isLoading$: Observable<boolean>;
  isLogged$: Observable<IUser>;
  private searchSubscription: Subscription;

  constructor(
    private playersSearchService: PlayersSearchService,
    private authService: AuthService,
  ) { }


  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.searchSubscription = this.playersSearchService.searchPlayers().subscribe((val: IPlayer[]) => this.items = val);
    this.isLoading$ = this.playersSearchService.loading$;
  }

  public trySearchByName(value: string) {
    this.playersSearchService.searchSubject$.next(value);
    this.items = this.playersSearchService.getFilteredItems();
  }

  public tryFilterByGame(value: string) {
    this.playersSearchService.gameSubject$.next(value);
    this.items = this.playersSearchService.getFilteredItems();
  }

  public tryFilterByCountry(value: string) {
    this.playersSearchService.countrySubject$.next(value);
    this.items = this.playersSearchService.getFilteredItems();
  }

  public tryFilterByMine(value: boolean) {
    this.playersSearchService.myPlayersSubject$.next(value);
    this.items = this.playersSearchService.getFilteredItems();
  }

  public tryFilterByFavorite(value: boolean) {
    this.playersSearchService.myFavoritesSubject$.next(value);
    this.items = this.playersSearchService.getFilteredItems();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
