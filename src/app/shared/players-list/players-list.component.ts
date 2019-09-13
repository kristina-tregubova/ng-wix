import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { map, tap, last } from 'rxjs/operators';
import { PlayersSearchService } from 'src/app/players-search/players-search.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  @Input() items: IPlayer[];
  @Input() isLoading$: Observable<boolean>;

  order: boolean = false;

  constructor(
    private playersSearchService: PlayersSearchService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    // this.handleSorting(null, 'name', 'letters');
  }

  

  handleSorting($event, field: string, sortType: string) {

    this.order = !this.order;
    this.playersSearchService.startLoading();

    if ($event) {
      document.querySelectorAll('.sorting-header button').forEach((el) => el.classList.remove('active-sorting'));
      $event.currentTarget.classList.add('active-sorting');
    }

    this.items.sort((a: IPlayer, b: IPlayer) => {
        if (sortType === 'letters') {
          console.log('tack');
          return (this.order) ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
        } else if (sortType === 'numbers') {
          console.log('tick');
          return (this.order) ? +a[field] - +b[field] : +b[field] - +a[field];
        }
      });

    this.playersSearchService.stopLoading();
  }

}
