import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { PlayersSearchService } from 'src/app/components/players-search/players-search.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnChanges {

  @Input() items: IPlayer[];
  @Input() isLoading$: Observable<boolean>;

  order: boolean = false;

  showEnd: number = 10;
  ifShowMoreBtn = true;

  constructor(
    private playersSearchService: PlayersSearchService
  ) { }

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


  ngOnChanges() {
    if (this.items) {
      this.ifShowMoreBtn = (this.showEnd >= this.items.length) ?  false : true
    }
  }

  handleShowMore() {

    if (this.showEnd <= this.items.length) {
      this.ifShowMoreBtn = true;
      this.showEnd += 5;
      if (this.showEnd >= this.items.length) {
        this.ifShowMoreBtn = false;
      }
    }
  }

}
