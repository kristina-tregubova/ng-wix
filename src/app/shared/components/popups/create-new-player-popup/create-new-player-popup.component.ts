import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { CreateNewPlayerPopupService } from './create-new-player-popup.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IPlayer } from 'src/app/core/models/IPlayer';

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

  public createNewPlayerDoc(): Promise<DocumentReference> {
    return this.createNewPlayerPopupService.createDefaultPlayer();
  }

  // subject to refactoring
  public async handleSavePlayerToDb(): Promise<void> {

    const data: IPlayer = {
      'id': this.ref.id,
      'name': this.name,
      'playerType': this.data.playerType,
      'country': this.country,
      'game': this.data.game,
      'userCreated': this.authService.getUserLoggedRef,
      'wins': null,
      'games': null,
      'relatedTournaments': null,
      'team': null
    }

    this.createNewPlayerPopupService.updateDefaultPlayer(this.ref, data)
      .then(() => {
        console.log('successfully added player')
      })
      .catch((err: Error) => {
        console.error(err);
      })

    this.returnNewPlayer(this.ref);
    this.createNewPlayerPopupService.updateUserInfo(this.ref);
  }

  private async returnNewPlayer(ref: DocumentReference): Promise<void> {

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

  public cancelCreateNewPlayer(): void {
    this.createNewPlayerPopupService.deleteNewPlayer(this.ref);
    this.dialogRef.close();
  }

}
