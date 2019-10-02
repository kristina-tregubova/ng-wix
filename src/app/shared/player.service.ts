import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ITourno } from '../core/models/ITourno';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPlayer } from '../core/models/IPlayer';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  emptyTeamMember: {} = { name: '', role: '' };


  constructor(
    private afs: AngularFirestore,
  ) { }

  getPlayer(id: string) {
    return this.afs.collection('players').doc(id).valueChanges();
  }

  getPlayerLogo(ref) {
    return firebase.storage().refFromURL(ref);
  }

  getTournamentsAttended(player): ITourno[] {
    const items: Array<ITourno> = [];

    if (player.relatedTournaments) {
      for (const tourno of player.relatedTournaments) {
        tourno.tournament.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const id = doc.id;
            items.push({ id, ...data });
          }
        });
      }
    }
    return items;
  }

  addTeamMember(player: IPlayer, playerId: string) {

    this.afs.collection('players').doc(playerId).update({

      'team': firebase.firestore.FieldValue.arrayUnion(this.emptyTeamMember)

    }).then(() => {
      console.log('Document successfully updated!');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });

  }

  updateField(player: IPlayer, playerId: string, field: string) {
    let updateInfo = {};
    updateInfo['' + field] = player[field];

    this.afs.collection('players').doc(playerId).update(

      updateInfo

    ).then(() => {
      console.log('Document successfully updated!');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }

  deletePlayer(playerId: string) {
    this.afs.collection('players').doc(playerId).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }
}
