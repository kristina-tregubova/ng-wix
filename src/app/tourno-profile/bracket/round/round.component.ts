import { Component, Input, OnInit } from '@angular/core';
import { IRound } from 'src/app/tourno-creation/IRound';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() round: Map<string, Array<Map<string, string>>>;
  @Input() roundType: string;
  @Input() isEditingDisabled: boolean;
  games;

  constructor() { }

  ngOnInit() {
      this.games = this.round.get('games')
  }
}
