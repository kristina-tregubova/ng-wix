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
    this.items$ = this.handleSorting(null, 'name', 'letters');
  }

  handleSorting($event, field: string, sortType: string) {

    this.order = !this.order;
    console.log($event)

    if ($event) {
      document.querySelectorAll('.sorting-header button').forEach((el) => el.classList.remove('active-sorting'));
      $event.currentTarget.classList.add('active-sorting');
    }

    // if (!this.order) {
    //   document.querySelector('.sorting-header__buttons .up').style.color = '$wix-primary';
    // }

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
