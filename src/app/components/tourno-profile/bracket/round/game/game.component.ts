import { Component, Input, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { IGame } from 'src/app/core/models/IRound';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],

})
export class GameComponent implements OnInit, DoCheck {

  @Input() game: IGame;
  @Input() isEditingDisabled: boolean;
  @Input() last: boolean;

  tournoId: string;

  firstId: string;
  secondId: string;
  firstName: string;
  secondName: string;


  isFirstWinner: boolean;
  isSecondWinner: boolean;
  @Output() TournoWinnerEmitter: EventEmitter<{}> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit() {

    this.tournoId = this.route.snapshot.paramMap.get('id');

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

    console.log(this.last)
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
        this.TournoWinnerEmitter.emit({winner: this.firstId, loser: this.secondId});
      } else {
        this.isFirstWinner = false;
        this.isSecondWinner = true;
        this.game.gameWinner = this.secondId;
        this.TournoWinnerEmitter.emit({winner: this.secondId, loser: this.firstId});
      }
    }
  }

  ifNotEmpty(val) {
    return (val === null || val === undefined) ? false : true;
  }

}
