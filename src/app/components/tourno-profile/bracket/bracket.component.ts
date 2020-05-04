import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {

  roundType: string;

  @Input() rounds: [];
  @Input() isEditingDisabled: boolean;

  @Output() TournoWinnerEmitter: EventEmitter<{}> = new EventEmitter();

  public defineRoundType(i: number): string {
    const index = i + 1;

    this.rounds.length === index
      ? this.roundType = 'finals'
      : this.rounds.length - 1 === index
        ? this.roundType = 'semifinals'
        : this.rounds.length - 2 === index
          ? this.roundType = 'quarterfinals'
          : this.rounds.length > 3 && index
            ? this.roundType = 'rounds'
            : null

    return this.roundType;
  }

}
