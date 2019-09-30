import { Injectable } from '@angular/core';
import { IPlayer } from 'src/app/core/models/IPlayer';
import { AngularFirestore } from '@angular/fire/firestore';

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
    relatedTournaments: null,
    team: null,
    points: 0,
    wins: 0,
    games: 0,
    logoRef: './assets/images/avatars/avatar.svg',
  }

  constructor(
    private afs: AngularFirestore,
  ) { }

  async createDefaultPlayer() {

    const defaultTournoRef = this.afs.collection('players').add(this.defaultPlayer)
      .then((docRef) => {
        return docRef;
      })

    return defaultTournoRef;
  }

  updateDefaultTourno(ref, data) {
    return ref.update(data);
  }

  deleteNewPlayer(ref) {
    return ref.delete();
  }
}
