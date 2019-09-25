import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges {

  @Input() game: Map<string, Map<string, any>>;
  @Input() isEditingDisabled: boolean;
  firstName: string;
  secondName: string;

  isFirstWinner: boolean;
  isSecondWinner: boolean;

  constructor() { }

  ngOnInit() {
    this.getNames();
    this.defineIfWinner();
  }

  ngOnChanges() {
    console.log(this.isEditingDisabled)
  }

  getNames() {
    this.game['player1']['id'].get().then((doc) => {
      if (doc.exists) {
        this.firstName = doc.data().name;
      }
    });

    this.game['player2']['id'].get().then((doc) => {
      if (doc.exists) {
        this.secondName = doc.data().name;
      }
    });
  }

  defineIfWinner() {
    let res = this.game['player1']['points'] - this.game['player2']['points'];

    if (res > 0) {
      this.isFirstWinner = true;
      this.isSecondWinner = false;
    } else if (res < 0) {
      this.isFirstWinner = false;
      this.isSecondWinner = true;
    }
  }

}
