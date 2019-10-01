import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  @Input() items$: Observable<IPlayer[]> | null = null; // current players
  @Input() participants: string;
  @Input() tournoInfo: IPlayer;

  @Output() chosenPlayers$: BehaviorSubject<IPlayer[]> = new BehaviorSubject([]);
  newArray: IPlayer[];

  // searchedPlayers: Array<IPlayer>;

  showAddNew = false;

  constructor(
  ) { }

  ngOnInit() {
    this.chosenPlayers$.subscribe(val => {
      this.newArray = [...val];
    });
  }

  handleChangeView() {
    this.showAddNew = !this.showAddNew;
  }

  handleAddPlayerToList(player) {
    this.newArray.push(player);
    this.chosenPlayers$.next(this.newArray);
  }

  handleRemovePlayerFromList(player) {

    let index = this.newArray.indexOf(player);
    if (index > -1) {
      this.newArray.splice(index, 1);
    }
    this.chosenPlayers$.next(this.newArray);
  }

  // setSearchedPlayers(val) {
  //   this.searchedPlayers = [...val];
  //   console.log(this.searchedPlayers)
  // }


}
