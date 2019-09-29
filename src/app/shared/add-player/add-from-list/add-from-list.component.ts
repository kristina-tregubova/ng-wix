import { Component, OnInit, DoCheck } from '@angular/core';
import { PlayersSearchService } from 'src/app/players-search/players-search.service';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-from-list',
  templateUrl: './add-from-list.component.html',
  styleUrls: ['./add-from-list.component.scss']
})
export class AddFromListComponent implements OnInit, DoCheck {

  searchedPlayers: Array<IPlayer>;
  isLoading$: Observable<boolean>;

  constructor(
    private playersSearchService: PlayersSearchService,
  ) { }

  ngOnInit() {

    this.playersSearchService.searchPlayers().subscribe((val: Array<IPlayer>) => {
      this.searchedPlayers = val;
      this.playersSearchService.myPlayersSubject$.next(true);
    });

  }

  ngDoCheck() {
    if (this.searchedPlayers) {
      this.searchedPlayers = this.playersSearchService.getFilteredItems();
    }
  }

  trySearchByName($event) {
    this.playersSearchService.searchSubject$.next($event);
    this.searchedPlayers = this.playersSearchService.getFilteredItems();
  }

}
