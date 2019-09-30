import { Component, OnInit, Input } from '@angular/core';
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
  chosenPlayers$: BehaviorSubject<IPlayer[]> = new BehaviorSubject([]);

  searchedPlayers: Array<IPlayer>;
  readySearchedPlayers: Array<IPlayer>;

  showAddNew = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  handleChangeView() {
    this.showAddNew = !this.showAddNew;
  }

  handleAddPlayerToList(player) {
    let newArray;

    this.chosenPlayers$.subscribe(val => {

      newArray = [...val];
      newArray.push(player);

    });

    this.chosenPlayers$.next(newArray);
  }

  handleRemovePlayerFromList(player) {

    let newArray;

    this.chosenPlayers$.subscribe(val => {

      const index = val.indexOf(player);
      if (index > -1) {
        val.splice(index, 1);
        newArray = [...val];
      }
    });

    this.chosenPlayers$.next(newArray);
  }

  // setSearchedPlayers(val) {
  //   this.searchedPlayers = [...val];
  //   console.log(this.searchedPlayers)
  // }


}
