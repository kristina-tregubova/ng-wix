import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ITourno } from '../core/models/ITourno';
import { AuthService } from '../core/auth.service';
import * as firebase from 'firebase'
import { IGame, IRound } from './IRound';


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

    ref.update({
      'rounds': rounds
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
  
    console.log(chosenPlayers)

    let numberOfRounds = this.defineRoundsNumber(participantsNumber);
    let numberOfGames = this.defineGamesNumber(participantsNumber);

    let rounds = [];

    for (let i = 0; i < numberOfRounds; i++) {

      if (numberOfGames > 1) {
        let round;

        if (i === 0) {
          round = this.createRoundWithPlayers(numberOfGames, chosenPlayers)
        } else {
          round = this.createRound(numberOfGames)
        };
        console.log(round)
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
    let round = {
      games: []
    };

    for (let i = 0; i < numberOfGames; i++) {
      let game: IGame = this.createGameWithPlayers(roundCandidates[i + i], roundCandidates[i + i + 1]);
      round.games.push(game);
    }

    return round;
  }

  createRound(numberOfGames) {
    let round = {
      games: []
    };

    for (let i = 0; i < numberOfGames; i++) {
      let game: IGame = this.createGame();
      round.games.push(game);
    }

    return round;

  }

  createGameWithPlayers(p1, p2) {
    let game: IGame = {
      'player1': {
        id: p1.id,
        points: null
      },
      'player2': {
        id: p2.id,
        points: null
      },
    }

    return game;
  }

  createGame() {

    let game: IGame = {
      'player1': {
        id: null,
        points: null
      },
      'player2': {
        id: null,
        points: null
      },
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
