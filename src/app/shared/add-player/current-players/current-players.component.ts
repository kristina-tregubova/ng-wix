import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Component({
  selector: 'app-current-players',
  templateUrl: './current-players.component.html',
  styleUrls: ['./current-players.component.scss']
})
export class CurrentPlayersComponent implements OnInit {

  @Input() items$: Observable<IPlayer[]>;

  constructor() { }

  ngOnInit() {
  }

}
