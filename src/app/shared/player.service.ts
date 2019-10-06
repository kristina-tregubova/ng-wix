import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ITourno } from '../core/models/ITourno';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPlayer } from '../core/models/IPlayer';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  emptyTeamMember = { name: '', role: '' };


  constructor(
    private afs: AngularFirestore,
  ) { }

  getPlayer(id: string) {
    return this.afs.collection('players').doc(id).valueChanges();
  }

  getPlayerGames(relatedTournaments) {
    return relatedTournaments.length;
  }

  getPlayerWins(relatedTournaments) {
    let wins = 0;

    for (let tourno of relatedTournaments) {
      if (tourno.isWinner) {
        wins++;
      }
    }

    return wins;
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
    let teamArr = player.team;
    teamArr.push(this.emptyTeamMember)

    this.afs.collection('players').doc(playerId).update({

      'team': teamArr

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

  updatePlayerInfo(player) {

    if (player.relatedTournaments.length !== 0) {
      const games = this.getPlayerGames(player.relatedTournaments);
      const wins = this.getPlayerWins(player.relatedTournaments);

      this.afs.collection('players').doc(player.id).update({
        games,
        wins,
      })
    }
  }

  updateTournoWinner(winnerId, tournoId) {

    this.afs.collection('players').doc(winnerId).valueChanges().subscribe((val: IPlayer) => {

      val.relatedTournaments.map((el) => {

        if (el.tournament.id === tournoId) {
          el.isWinner = true;
        };
        return el;
      });

      this.afs.collection('players').doc(winnerId).update({
        relatedTournaments: val.relatedTournaments
      });
    });
  }

  updateTournoLoser(loserId, tournoId) {

    this.afs.collection('players').doc(loserId).valueChanges().subscribe((val: IPlayer) => {

      val.relatedTournaments.map((el) => {
        if (el.tournament.id === tournoId) {
          el.isWinner = false;
        };
        return el;
      })
      this.afs.collection('players').doc(loserId).update({
        relatedTournaments: val.relatedTournaments
      });
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
