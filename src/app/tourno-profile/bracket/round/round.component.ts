import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() round: Map<string, Array<Map<string, number>>>;

  constructor() { }

  ngOnInit() {
    console.log(this.round)
  }

}
