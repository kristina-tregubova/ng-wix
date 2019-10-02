import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { IGame } from 'src/app/tourno-creation/IRound';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges {

  @Input() game: IGame;
  @Input() isEditingDisabled: boolean;
  firstName: string;
  secondName: string;


  isFirstWinner: boolean;
  isSecondWinner: boolean;


  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {

    if (this.game.player1.id) {
      this.playerService.getPlayer(this.game.player1.id).subscribe((res: IPlayer) => {
        this.firstName = res.name;
      });
    }
    if (this.game.player2.id) {
      this.playerService.getPlayer(this.game.player2.id).subscribe((res: IPlayer) => {
        this.secondName = res.name;
      });
    }
  }

  ngOnChanges() {
    this.defineIfWinner();
  }

  defineIfWinner() {
    let res = +this.game.player1.points - +this.game.player2.points;

    if (res > 0) {
      this.isFirstWinner = true;
      this.isSecondWinner = false;
    } else if (res < 0) {
      this.isFirstWinner = false;
      this.isSecondWinner = true;
    }
  }

}
