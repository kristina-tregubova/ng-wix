import { Component, OnInit, Input } from '@angular/core';
import { ITourno } from 'src/app/core/models/ITourno';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  @Input() tourno: ITourno;

  constructor() { }

  ngOnInit() {
  }

}
