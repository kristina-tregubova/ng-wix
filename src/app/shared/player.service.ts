import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITourno } from '../core/models/ITourno';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getPlayer(id: string) {
    return this.afs.collection('players').doc(id).valueChanges();
  }

  getTournamentsAttended(player): ITourno[] {
    const items: Array<ITourno> = [];

    for (const tourno of player.relatedTournaments) {
      tourno.tournament.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const id = doc.id;
          items.push({id, ...data});
        }
      });
    }
    return items;
  }

}
