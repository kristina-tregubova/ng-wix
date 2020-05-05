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

  order: boolean = false;

  showEnd: number = 10;
  ifShowMoreBtn = true;

  @Input() items: IPlayer[];
  @Input() isLoading$: Observable<boolean>;

  constructor(
    private playersSearchService: PlayersSearchService
  ) { }

  ngOnChanges() {
    if (this.items) {
      this.ifShowMoreBtn = (this.showEnd >= this.items.length) ? false : true
    }
  }

  // subject to refactoring --> event type
  public handleSorting($event: any, field: string, sortType: string): void {

    this.order = !this.order;
    this.playersSearchService.startLoading();

    if ($event) {
      document.querySelectorAll('.sorting-header button').forEach((el) => el.classList.remove('active-sorting'));
      $event.currentTarget.classList.add('active-sorting');
    }

    this.items.sort((a: IPlayer, b: IPlayer) => {
      if (sortType === 'letters') {
        return (this.order) ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
      } else if (sortType === 'numbers') {
        return (this.order) ? +a[field] - +b[field] : +b[field] - +a[field];
      }
    });

    this.playersSearchService.stopLoading();
  }

  public handleShowMore(): void {

    if (this.showEnd <= this.items.length) {
      this.ifShowMoreBtn = true;
      this.showEnd += 5;
      if (this.showEnd >= this.items.length) {
        this.ifShowMoreBtn = false;
      }
    }
  }

}
