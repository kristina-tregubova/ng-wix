import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournos-list',
  templateUrl: './tournos-list.component.html',
  styleUrls: ['./tournos-list.component.scss']
})
export class TournosListComponent implements OnInit {

  @Input() items: any[];
  @Input() isLoading$: Observable<boolean>;

  showEnd: number = 1;
  ifShowMoreBtn = true;

  constructor() { }

  ngOnInit() {

  }

  handleShowMore() {

    if (this.showEnd < this.items.length) {
      this.ifShowMoreBtn = true;
      this.showEnd += 1;
      if (this.showEnd >= this.items.length) {
        this.ifShowMoreBtn = false;
      }
    }
  }

}
