import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { CreateNewPlayerPopupService } from './create-new-player-popup.service';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Component({
  selector: 'app-create-new-player-popup',
  templateUrl: './create-new-player-popup.component.html',
  styleUrls: ['./create-new-player-popup.component.scss']
})
export class CreateNewPlayerPopupComponent implements OnInit {

  ref: DocumentReference;

  name: string;
  playerType: string;

  player: IPlayer;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateNewPlayerPopupComponent>,
    private afs: AngularFirestore,
    private createNewPlayerPopupService: CreateNewPlayerPopupService,
  ) { }

  ngOnInit() {
    this.createNewPlayerDoc().then(ref => {
      this.ref = ref;
    })
  }

  createNewPlayerDoc() {
    return this.createNewPlayerPopupService.createDefaultPlayer();
  }

  handleSavePlayerToDb() {
    const data = {
      'name': this.name,
      'playerType': this.playerType,
      'country': this.data.country,
      'game': this.data.game
    }
    console.log(data)

    this.createNewPlayerPopupService.updateDefaultTourno(this.ref, data)
      .then(() => {
        console.log('successfully added player')
      })
      .catch((err) => {
        console.error(err);
      })

    this.returnNewPlayer(this.ref);

    this.dialogRef.close();
  }

  returnNewPlayer(ref) {
    ref.get()
      .then((doc) => {
        if (doc.exists) {
          this.player = doc;
        }
      });
  }

  cancelCreateNewPlayer() {
    this.createNewPlayerPopupService.deleteNewPlayer(this.ref);
    this.dialogRef.close();
  }

}
