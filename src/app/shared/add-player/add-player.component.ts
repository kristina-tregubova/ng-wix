import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { DocumentReference, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  @Input() items$: Observable<IPlayer[]> | null = null; // current players
  @Input() participants: string;
  @Input() tournoInfo: IPlayer;

  chosenPlayers$: BehaviorSubject<IPlayer[]> = new BehaviorSubject([]);
  newArray: IPlayer[];
  @Output() relatedPlayers: EventEmitter<DocumentReference[]> = new EventEmitter();
  newRefArray: DocumentReference[] = [];

  // searchedPlayers: Array<IPlayer>;

  showAddNew = false;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.chosenPlayers$.subscribe(val => {
      this.newArray = [...val];
    });
  }

  handleChangeView() {
    this.showAddNew = !this.showAddNew;
  }

  async getPlayerRef(player) {
    return await this.afs.doc('players/' + player.id).ref
  }

  handleAddPlayerToList(player: IPlayer) {
    this.newArray.push(player);

    this.getPlayerRef(player)
      .then((ref) => {
        this.newRefArray.push(ref);
        return this.newRefArray;
      })
      .then((arr) => {
        this.relatedPlayers.emit(arr);
      })

    this.chosenPlayers$.next(this.newArray);

  }

  handleRemovePlayerFromList(player) {

    let index = this.newArray.indexOf(player);
    if (index > -1) {
      this.newArray.splice(index, 1);
    }

    this.getPlayerRef(player).then((ref) => {
      let index = this.newRefArray.indexOf(ref);
      if (index > -1) {
        this.newArray.splice(index, 1);
      }
      return this.newRefArray;
    })
      .then((arr) => {
        this.relatedPlayers.emit(arr);
      })

    this.chosenPlayers$.next(this.newArray);
  }

  // setSearchedPlayers(val) {
  //   this.searchedPlayers = [...val];
  //   console.log(this.searchedPlayers)
  // }


}
