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

  getTournamentsAttended(player): Observable<ITourno[]> {
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
    return of(items);
  }

  getPlayerPoints(player) {
    let sum = 0;
    for (const tourno of player.relatedTournaments) {
      sum = sum + tourno.pointsGained;
    }
    return sum;
  }

  getPlayerGames(player) {
    return player.relatedTournaments.length;
  }

  getPlayerWins(player) {
    const winArr = player.relatedTournaments.filter(tourno => tourno.isWinner === true);
    return winArr.length;
  }


}
