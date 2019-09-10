import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

  @Input() item;
  points: number;
  games: number;
  wins: number;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.points = this.playerService.getPlayerPoints(this.item);
    this.games = this.playerService.getPlayerGames(this.item);
    this.wins = this.playerService.getPlayerWins(this.item);
  }

}
