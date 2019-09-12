import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  @Input() items$: Observable<any>;
  @Input() isLoading$: Observable<boolean>;

  order: boolean = false;

  constructor() { }

  ngOnInit() {
    this.items$ = this.handleSorting('name', 'letters');
  }

  handleSorting(field: string, sortType: string) {

    this.order = !this.order;

    this.items$ = this.items$.pipe(
      map((itemArr: IPlayer[]) => {
        return itemArr = itemArr.sort((a: IPlayer, b: IPlayer) => {
          if (sortType === 'letters') {
            return (this.order) ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
          } else {
            return (this.order) ? a[field] - b[field] : b[field] - a[field];
          }
        });
      }),
    );

    return this.items$;
  }

}
