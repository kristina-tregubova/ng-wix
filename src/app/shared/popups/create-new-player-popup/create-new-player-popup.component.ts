import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { CreateNewPlayerPopupService } from './create-new-player-popup.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-create-new-player-popup',
  templateUrl: './create-new-player-popup.component.html',
  styleUrls: ['./create-new-player-popup.component.scss']
})
export class CreateNewPlayerPopupComponent implements OnInit {

  ref: DocumentReference;

  name: string;
  country: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateNewPlayerPopupComponent>,
    private afs: AngularFirestore,
    private createNewPlayerPopupService: CreateNewPlayerPopupService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.createNewPlayerDoc().then(ref => {
      this.ref = ref;
    })
  }

  createNewPlayerDoc() {
    return this.createNewPlayerPopupService.createDefaultPlayer();
  }

  async handleSavePlayerToDb() {
    const data = {
      'id': this.ref.id,
      'name': this.name,
      'playerType': this.data.playerType,
      'country': this.country,
      'game': this.data.game,
      'userCreated': this.authService.getUserLoggedRef,
    }

    this.createNewPlayerPopupService.updateDefaultPlayer(this.ref, data)
      .then(() => {
        console.log('successfully added player')
      })
      .catch((err) => {
        console.error(err);
      })


      this.returnNewPlayer(this.ref);
      this.createNewPlayerPopupService.updateUserInfo(this.ref);
  }

  async returnNewPlayer(ref) {

    await ref.get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      })
      .then((doc) => {
        this.dialogRef.close(doc);
      })
  }

  cancelCreateNewPlayer() {
    this.createNewPlayerPopupService.deleteNewPlayer(this.ref);
    this.dialogRef.close();
  }

}
