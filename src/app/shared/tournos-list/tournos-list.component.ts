import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournos-list',
  templateUrl: './tournos-list.component.html',
  styleUrls: ['./tournos-list.component.scss']
})
export class TournosListComponent implements OnInit {

  @Input() items$: Observable<any>;

  constructor() { }

  ngOnInit() {

  }

}
