import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ITourno } from '../../core/models/ITourno';
import { AuthService } from '../../core/services/auth.service';
import * as firebase from 'firebase';
import { IGame, IRound } from '../../core/models/IRound';
import { PlayerService } from '../../core/services/player.service';
import { MatSnackBar } from '@angular/material';
import { IPlayer } from 'src/app/core/models/IPlayer';


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
    private playerService: PlayerService,
    private snackBar: MatSnackBar
  ) { }

  public async createDefaultTourno(): Promise<DocumentReference> {
    const docRef = await this.afs.collection('tournaments').add(this.defaultTourno);
    return docRef;
  }

  public updateDefaultTourno(ref: DocumentReference, data: ITourno) {
    return ref.update(data);
  }

  public updateUserInfo(ref: DocumentReference): void {
    this.authService.getUserLoggedRef.update({
      createdTournos: firebase.firestore.FieldValue.arrayUnion(ref)
    });
  }

  public updateTournoInfoForPlayers(relatedPlayers: DocumentReference[], ref: DocumentReference): void {

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

  public updateRelatedPlayers(val: DocumentReference[], ref: DocumentReference): void {
    ref.update({
      relatedPlayers: val
    });
  }

  public updateRounds(rounds: IRound[], ref: DocumentReference): Promise<void> {
    return ref.update({
      rounds
    });
  }

  public async seedPlayers(ifRandom: boolean, ref: DocumentReference): Promise<DocumentReference[]> {

    const playersArr: DocumentReference[] = await ref.get().then((doc) => {
      if (doc.exists) {
        return doc.data().relatedPlayers;
      }
    });

    if (ifRandom) {
      this.shuffleArray(playersArr);
    }

    return playersArr;
  }


  public generateBracket(participantsNumber: number, chosenPlayers: DocumentReference[]): IRound[] {

    let numberOfRounds = this.defineRoundsNumber(participantsNumber);
    let numberOfGames = this.defineGamesNumber(participantsNumber);

    const rounds: IRound[] = [];

    for (let i = 0; i < numberOfRounds; i++) {
      let round: IRound;

      if (numberOfGames > 1) {

        i === 0
          ? round = this.createRoundWithPlayers(numberOfGames, chosenPlayers)
          : round = this.createRound(numberOfGames);

        numberOfGames = numberOfGames / 2;

      } else if (numberOfGames === 1) {
        round = this.createRound(1);
      }

      rounds.push(round);
    }

    return rounds;
  }

  // subject to refactoring
  private createRoundWithPlayers(numberOfGames: number, roundCandidates: DocumentReference[]): IRound {
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

  private createRound(numberOfGames: number): IRound {
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

  // subject to refactoring
  private createGameWithPlayers(p1: DocumentReference, p2: DocumentReference): IGame {
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

  private createGame(): IGame {

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

  private defineRoundsNumber(num: number): number {
    let k = 0;
    do {
      k++;
      num = num / 2;
    } while (num !== 1);

    return k;
  }

  private defineGamesNumber(num: number): number {
    return num / 2;
  }

  public deleteTourno(ref: DocumentReference): void {
    ref.delete().then(() => {
      this.snackBar.open('Tournament was successfully deleted! 👍', '', {
        duration: 3000
      });
    }).catch((error) => {
      this.snackBar.open('Error occured while deleting this tournament. Try again later 👻', '', {
        duration: 3000
      });
      console.error(error)
    });
  }

  // Fisher-Yates shuffle
  shuffleArray(array: DocumentReference[]): DocumentReference[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
