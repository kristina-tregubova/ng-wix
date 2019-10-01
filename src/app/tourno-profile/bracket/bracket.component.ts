import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { IRound } from 'src/app/tourno-creation/IRound';
import { ParserService } from 'src/app/shared/parser.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements DoCheck {

  @Input() rounds: [];
  @Input() isEditingDisabled: boolean;
  roundType: string;

  constructor() { }

  ngDoCheck() {

  }

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
