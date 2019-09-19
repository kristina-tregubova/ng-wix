import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tourno-card',
  templateUrl: './tourno-card.component.html',
  styleUrls: ['./tourno-card.component.scss']
})
export class TournoCardComponent implements OnInit {

  @Input() item;
  isFavorite: boolean;

  constructor() { }

  ngOnInit() {

  }

  addToFavorite() {
    console.log('added to fav');
  }

}
