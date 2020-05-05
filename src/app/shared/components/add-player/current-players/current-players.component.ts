import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Component({
  selector: 'app-current-players',
  templateUrl: './current-players.component.html',
  styleUrls: ['./current-players.component.scss']
})
export class CurrentPlayersComponent {

  @Input() currentPlayers$: Observable<IPlayer[]>;
  @Output() removeChosenPlayer: EventEmitter<IPlayer> = new EventEmitter<IPlayer>();

  public handleRemoveChosenPlayers(player: IPlayer): void {
    this.removeChosenPlayer.emit(player);
  }

}
