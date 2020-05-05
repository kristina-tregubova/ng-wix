import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ITourno } from 'src/app/core/models/ITourno';

@Component({
  selector: 'app-tournos-list',
  templateUrl: './tournos-list.component.html',
  styleUrls: ['./tournos-list.component.scss'],
})
export class TournosListComponent implements OnChanges {

  @Input() items: ITourno[];
  @Input() isLoading$: Observable<boolean>;

  showEnd: number = 6;
  ifShowMoreBtn = true;

  ngOnChanges() {
    if (this.items) {
      this.ifShowMoreBtn = !(this.showEnd >= this.items.length);
    }
  }

  public handleShowMore(): void {

    if (this.showEnd <= this.items.length) {
      this.ifShowMoreBtn = true;
      this.showEnd += 3;
      if (this.showEnd >= this.items.length) {
        this.ifShowMoreBtn = false;
      }
    }
  }

}
