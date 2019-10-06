import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournos-list',
  templateUrl: './tournos-list.component.html',
  styleUrls: ['./tournos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournosListComponent implements OnChanges {

  @Input() items: any[];
  @Input() isLoading$: Observable<boolean>;

  showEnd: number = 6;
  ifShowMoreBtn = true;

  constructor() { }

  ngOnChanges() {
    if (this.items) {
      this.ifShowMoreBtn = (this.showEnd >= this.items.length) ?  false : true
    }
  }

  handleShowMore() {

    if (this.showEnd <= this.items.length) {
      this.ifShowMoreBtn = true;
      this.showEnd += 3;
      if (this.showEnd >= this.items.length) {
        this.ifShowMoreBtn = false;
      }
    }
  }

}
