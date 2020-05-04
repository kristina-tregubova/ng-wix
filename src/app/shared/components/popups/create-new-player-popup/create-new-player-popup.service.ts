import { Injectable } from '@angular/core';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import * as firebase from 'firebase'
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CreateNewPlayerPopupService {

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

  async createDefaultPlayer() {

    const defaultTournoRef = this.afs.collection('players').add(this.defaultPlayer)
      .then((docRef) => {
        return docRef;
      })

    return defaultTournoRef;
  }

  updateDefaultPlayer(ref, data) {
    return ref.update(data).then(() => {
      this.snackBar.open('Player was successfully created! 👍', '', {
        duration: 3000
      });
    })
    .catch((err) => {
      this.snackBar.open('Error occured while creating a player. Try again later 👻', '', {
        duration: 3000
      });
      console.error(err);
    });
  }

  updateUserInfo(ref) {
    this.authService.getUserLoggedRef.update({
      'createdPlayers': firebase.firestore.FieldValue.arrayUnion(ref)
    })
  }

  deleteNewPlayer(ref) {
    return ref.delete();
  }
}
