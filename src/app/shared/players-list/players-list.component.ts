import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  @Input() items$: Observable<any>;
  @Input() isLoading$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
    // this.items$.subscribe(val=>console.log(val))
  }

}
