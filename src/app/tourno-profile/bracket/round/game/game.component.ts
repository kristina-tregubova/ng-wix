import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { IGame } from 'src/app/core/models/IRound';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, DoCheck {

  @Input() game: IGame;
  @Input() isEditingDisabled: boolean;

  firstId: string;
  secondId: string;
  firstName: string;
  secondName: string;


  isFirstWinner: boolean;
  isSecondWinner: boolean;


  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {

    this.firstId = this.game.player1.id;
    this.secondId = this.game.player2.id;

    if (this.firstId) {
      this.playerService.getPlayer(this.firstId).subscribe((res: IPlayer) => {
        this.firstName = res.name;
      });
    }
    if (this.secondId) {
      this.playerService.getPlayer(this.secondId).subscribe((res: IPlayer) => {
        this.secondName = res.name;
      });
    }
  }

  ngDoCheck() {
    this.defineIfWinner();
  }

  defineIfWinner() {
    const res = (+this.game.player1.points - +this.game.player2.points) > 0;

    if (this.ifNotEmpty(this.firstName) && this.ifNotEmpty(this.secondName) && this.ifNotEmpty(this.game.player1.points) && this.ifNotEmpty(this.game.player2.points)) {

      if (res) {
        this.isFirstWinner = true;
        this.isSecondWinner = false;
        this.game.gameWinner = this.firstId;
      } else {
        this.isFirstWinner = false;
        this.isSecondWinner = true;
        this.game.gameWinner = this.secondId;

      }
    }
  }

  ifNotEmpty(val) {
    return (val === null || val === undefined) ? false : true;
  }

}
