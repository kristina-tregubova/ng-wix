import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PlayersSearchService } from 'src/app/components/players-search/players-search.service';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-from-list',
  templateUrl: './add-from-list.component.html',
  styleUrls: ['./add-from-list.component.scss']
})
export class AddFromListComponent implements OnInit, OnDestroy {

  searchedPlayers: Array<IPlayer>;

  isLoading$: Observable<boolean>;

  showEnd: number = 10;
  ifShowMoreBtn = true;

  sub: Subscription;

  @Output() newChosenPlayer: EventEmitter<IPlayer> = new EventEmitter<IPlayer>();

  constructor(
    private playersSearchService: PlayersSearchService,
  ) { }

  ngOnInit() {

    this.sub = this.playersSearchService.searchPlayers().subscribe((val: Array<IPlayer>) => {
      this.searchedPlayers = val;
    });
  }


  public trySearchByName(value: string): void {
    this.playersSearchService.searchSubject$.next(value);
    this.searchedPlayers = this.playersSearchService.getFilteredItems();
  }

  public handleAddChosenPlayers(player: IPlayer): void {
    this.newChosenPlayer.emit(player);
  }

  public handleShowMore(): void {

    if (this.showEnd <= this.searchedPlayers.length) {
      this.ifShowMoreBtn = true;
      this.showEnd += 2;
      if (this.showEnd >= this.searchedPlayers.length) {
        this.ifShowMoreBtn = false;
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
