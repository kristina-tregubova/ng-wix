import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {

  @Input() rounds: [];
  @Input() isEditingDisabled: boolean;
  roundType: string;

  constructor() { }


  defineRoundType(i) {
    let index = i + 1;

    if (this.rounds.length === index) {
      this.roundType = 'finals';
    } else if ((this.rounds.length - 1) === index) {
      this.roundType = 'semifinals';
    } else if ((this.rounds.length - 2) === index) {
      this.roundType = 'quarterfinals';
    } else if ((this.rounds.length > 3) && index) {
      this.roundType = 'rounds';
    }

    return this.roundType;
  }

}
