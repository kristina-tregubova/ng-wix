import { Injectable } from '@angular/core';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import * as firebase from 'firebase'
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CreateNewPlayerPopupService {

  // subject to refactoring
  defaultPlayer: IPlayer = {
    id: null,
    name: null,
    playerType: null,
    game: null,
    country: null,
    userCreated: null,
    relatedTournaments: [],
    team: [],
    wins: 0,
    games: 0,
    logoRef: './assets/images/avatars/avatar.svg',
  }

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  public async createDefaultPlayer(): Promise<DocumentReference> {

    const defaultTournoRef = this.afs.collection('players').add(this.defaultPlayer)
      .then((docRef) => {
        return docRef;
      })

    return defaultTournoRef;
  }

  public async updateDefaultPlayer(ref: DocumentReference, data: IPlayer) {
    try {
      await ref.update(data);
      this.snackBar.open('Player was successfully created! 👍', '', {
        duration: 3000
      });
    }
    catch (err) {
      this.snackBar.open('Error occured while creating a player. Try again later 👻', '', {
        duration: 3000
      });
      console.error(err);
    }
  }

  public updateUserInfo(ref: DocumentReference): void {
    this.authService.getUserLoggedRef.update({
      'createdPlayers': firebase.firestore.FieldValue.arrayUnion(ref)
    })
  }

  public deleteNewPlayer(ref: DocumentReference): Promise<void> {
    return ref.delete();
  }
}
