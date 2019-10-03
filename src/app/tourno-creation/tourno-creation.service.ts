import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ITourno } from '../core/models/ITourno';
import { AuthService } from '../core/auth.service';
import * as firebase from 'firebase';
import { IGame, IRound } from '../core/models/IRound';
import { PlayerService } from '../shared/player.service';


@Injectable({
  providedIn: 'root'
})
export class TournoCreationService {

  defaultTourno: ITourno = {
    id: null,
    name: null,
    tournamentType: null,
    status: 'pending',
    game: null,
    country: null,
    participants: null,
    playerType: null,
    endDate: null,
    startDate: null,
    entryFee: null,
    prize: null,
    description: null,
    relatedPlayers: null,
    rounds: [],
    userCreated: this.authService.getUserLoggedRef,
  };

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private playerService: PlayerService
  ) { }

  async createDefaultTourno() {

    const defaultTournoRef = this.afs.collection('tournaments').add(this.defaultTourno)
      .then((docRef) => {
        return docRef;
      });

    return defaultTournoRef;
  }

  updateDefaultTourno(ref, data) {
    return ref.update(data);
  }

  updateUserInfo(ref) {
    this.authService.getUserLoggedRef.update({
      createdTournos: firebase.firestore.FieldValue.arrayUnion(ref)
    });
  }

  updateTournoInfoForPlayers(relatedPlayers: DocumentReference[], ref) {

    const newTournoField = { 
      isWinner: false, 
      pointsGained: 0, 
      tournament: ref 
    }

    for (let playerRef of relatedPlayers) {
      playerRef.update({
        'relatedTournaments': firebase.firestore.FieldValue.arrayUnion(newTournoField)
      })
    }
  }

  updateRelatedPlayers(val: DocumentReference[], ref) {
    ref.update({
      relatedPlayers: val
    });
  }

  updateRounds(rounds: IRound[], ref) {

    ref.update({
      rounds
    });

  }

  async seedPlayers(ifRandom, ref) {

    const playersArr = await ref.get().then((doc) => {
      if (doc.exists) {
        return doc.data().relatedPlayers;
      }
    });

    if (ifRandom) {
      this.shuffleArray(playersArr);
    }

    return playersArr;
  }


  generateBracket(participantsNumber, chosenPlayers) {

    let numberOfRounds = this.defineRoundsNumber(participantsNumber);
    let numberOfGames = this.defineGamesNumber(participantsNumber);

    const rounds = [];

    for (let i = 0; i < numberOfRounds; i++) {

      if (numberOfGames > 1) {
        let round;

        if (i === 0) {
          round = this.createRoundWithPlayers(numberOfGames, chosenPlayers);
        } else {
          round = this.createRound(numberOfGames);
        }

        rounds.push(round);

        numberOfGames = numberOfGames / 2;

      } else if (numberOfGames === 1) {

        const round = this.createRound(1);
        rounds.push(round);
      }
    }

    return rounds;
  }

  createRoundWithPlayers(numberOfGames, roundCandidates) {
    const round: IRound = {
      games: [],
      nextRoundCandidates: [],
    };

    for (let i = 0; i < numberOfGames; i++) {
      const game: IGame = this.createGameWithPlayers(roundCandidates[i + i], roundCandidates[i + i + 1]);
      round.games.push(game);
    }

    return round;
  }

  createRound(numberOfGames) {
    const round: IRound = {
      games: [],
      nextRoundCandidates: []
    };

    for (let i = 0; i < numberOfGames; i++) {
      const game: IGame = this.createGame();
      round.games.push(game);
    }

    return round;

  }

  createGameWithPlayers(p1, p2) {
    const game: IGame = {
      player1: {
        id: p1.id,
        points: null
      },
      player2: {
        id: p2.id,
        points: null
      },
      gameWinner: null
    };

    return game;
  }

  createGame() {

    const game: IGame = {
      player1: {
        id: null,
        points: null
      },
      player2: {
        id: null,
        points: null
      },
      gameWinner: null
    };

    return game;
  }

  defineRoundsNumber(num) {
    let k = 0;
    do {
      k++;
      num = num / 2;
    } while (num !== 1);

    return k;
  }

  defineGamesNumber(num) {
    return num / 2;
  }

  deleteTourno(ref) {
    ref.delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  // Fisher-Yates shuffle
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
