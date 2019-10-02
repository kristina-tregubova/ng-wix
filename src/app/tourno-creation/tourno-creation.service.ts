import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ITourno } from '../core/models/ITourno';
import { AuthService } from '../core/auth.service';
import * as firebase from 'firebase'
import { IGame, IRound } from './IRound';
import { ParserService } from '../shared/parser.service';

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
    private parser: ParserService
  ) { }

  async createDefaultTourno() {

    const defaultTournoRef = this.afs.collection('tournaments').add(this.defaultTourno)
      .then((docRef) => {
        return docRef;
      })

    return defaultTournoRef;
  }

  updateDefaultTourno(ref, data) {
    return ref.update(data);
  }

  updateUserInfo(ref) {
    this.authService.getUserLoggedRef.update({
      'createdTournos': firebase.firestore.FieldValue.arrayUnion(ref)
    })
  }

  updateRelatedPlayers(val: DocumentReference[], ref) {
    ref.update({
      'relatedPlayers': val
    })
  }

  updateRounds(rounds: IRound[], ref) {

    let parsedArr = this.parser.parseTo(rounds);

    ref.update({
      'rounds': parsedArr
    })

  }

  async seedPlayers(ifRandom, ref) {
    let playersArr = await ref.get().then((doc) => {
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

    let rounds = [];

    for (let i = 0; i < numberOfRounds; i++) {
      if (numberOfGames > 1) {
        let round = i === 0 ? this.createRoundWithPlayers(numberOfGames, chosenPlayers) : this.createRound(numberOfGames);
        rounds.push(round);

        numberOfGames = numberOfGames / 2;
      } else if (numberOfGames === 1) {
        let round = this.createRound(1);
        rounds.push(round);
      }
    }

    return rounds;
  }

  createRoundWithPlayers(numberOfGames, roundCandidates) {
    let round;
    let n: number = 1;

    for (let i = 0; i < numberOfGames; i++, n++) {
      let games = [];
      let game: IGame = this.createGameWithPlayers(roundCandidates[i+n], roundCandidates[i+n+1]);

      games.push(game);
    }
  }

  createRound(numberOfGames) {
    let round = new Map();
    let games = [];

    for (let i = 0; i < numberOfGames; i++) {
      let game: IGame = this.createGame();
      games.push(game);
    }

    round.set('games', games)
    return round;

  }

  createGameWithPlayers(p1, p2) {
    let player1 = new Map;
    player1.set('id', p1);
    player1.set('points', null);

    let player2 = new Map;
    player2.set('id', p2);
    player2.set('points', null);

    let game: IGame = {
      'player1': player1,
      'player2': player2,
    }

    return game;
  }

  createGame() {
    let player1 = new Map;
    player1.set('id', null);
    player1.set('points', null);

    let player2 = new Map;
    player2.set('id', null);
    player2.set('points', null);

    let game: IGame = {
      'player1': player1,
      'player2': player2,
      'nextPlayer': null
    }

    return game;
  }

  defineRoundsNumber(num) {
    let k = 0;
    do {
      k++;
      num = num / 2
    } while (num !== 1)

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

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
