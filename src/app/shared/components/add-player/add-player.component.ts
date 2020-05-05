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

  chosenPlayers$: BehaviorSubject<IPlayer[]> = new BehaviorSubject([]);
  newArray: IPlayer[];
  newRefArray: DocumentReference[] = [];
  showAddNew = false;

  @Input() items$: Observable<IPlayer[]> | null = null; // current players
  @Input() participants: string;
  @Input() tournoInfo: IPlayer;

  @Output() ifRandom: EventEmitter<DocumentReference[]> = new EventEmitter();
  @Output() relatedPlayers: EventEmitter<DocumentReference[]> = new EventEmitter();

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.chosenPlayers$.subscribe(val => {
      this.newArray = [...val];
    });
  }

  public handleChangeView(): void {
    this.showAddNew = !this.showAddNew;
  }

  private async getPlayerRef(player: IPlayer): Promise<DocumentReference> {
    return this.afs.doc('players/' + player.id).ref
  }

  public handleAddPlayerToList(player: IPlayer): void {
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

  public handleRemovePlayerFromList(player: IPlayer): void {

    let index = this.newArray.indexOf(player);
    if (index > -1) {
      this.newArray.splice(index, 1);
    }

    this.getPlayerRef(player)
      .then((ref) => {
        this.newRefArray = this.newRefArray.filter((val) => {
          return val.id !== ref.id
        })

        this.relatedPlayers.emit(this.newRefArray);
      })

    this.chosenPlayers$.next(this.newArray);
  }

}
