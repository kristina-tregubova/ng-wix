import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { PlayersSearchService } from 'src/app/players-search/players-search.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  @Input() items$: Observable<IPlayer[]>; // current players
  isNew = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  handleChangeView() {
    this.isNew = !this.isNew;
  }

}
