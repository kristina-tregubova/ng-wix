import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournos-list',
  templateUrl: './tournos-list.component.html',
  styleUrls: ['./tournos-list.component.scss']
})
export class TournosListComponent implements OnInit, OnChanges {

  @Input() items: any[];
  @Input() isLoading$: Observable<boolean>;

  showEnd: number = 6;
  ifShowMoreBtn = true;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.items) {
      this.ifShowMoreBtn = (this.showEnd >= this.items.length) ?  false : null
    }
  }

  handleShowMore() {

    if (this.showEnd <= this.items.length) {
      this.ifShowMoreBtn = true;
      this.showEnd += 1;
      if (this.showEnd >= this.items.length) {
        this.ifShowMoreBtn = false;
      }
    }
  }

}
