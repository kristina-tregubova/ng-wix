import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.getPoints();
    this.getGames();
    this.getWins();
  }

  getPoints() {
    let sum = 0;
    for (let tourno of this.item.relatedTournaments) {
      this.points = sum + tourno.pointsGained;
    }
  }

  getGames() {
    this.games = this.item.relatedTournaments.length;
  }

  getWins() {
    let winArr = this.item.relatedTournaments.filter(tourno => tourno.isWinner == true);
    this.wins = winArr.length;
  }

}
