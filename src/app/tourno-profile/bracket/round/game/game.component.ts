import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() game: Map<string, number>;

  constructor() { }

  ngOnInit() {
    console.log(this.game);
  }

}
