import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/IUser';
import { IRound } from '../../core/models/IRound';
import { ITourno } from 'src/app/core/models/ITourno';

@Injectable({
  providedIn: 'root'
})
export class TournoProfileService {

  user: IUser;

  constructor(
    private authService: AuthService
  ) { }

  public async checkIfCreator(tourno: ITourno): Promise<boolean> {

    let creatorId: string;
    const currentId = this.authService.getUserLogged.uid;

    if (tourno.userCreated) {
      await tourno.userCreated.get()
        .then((doc) => {
          if (doc.exists) {
            creatorId = doc.id;
          }
        });
    }
    return currentId === creatorId;
  }

  public updateRoundsInfo(rounds: IRound[]): IRound[] {

    for (let i = 0; i < (rounds.length - 1); i++) {
      const nextRoundCandidates = rounds[i].nextRoundCandidates;
      rounds[i + 1] = this.updateRoundWithPlayers(rounds[i + 1], nextRoundCandidates);
    }

    return rounds;
  }

  public updateRoundWithPlayers(round: IRound, nextRoundCandidates: string[]): IRound {

    for (let i = 0; i < round.games.length; i++) {
      round.games[i].player1.id = nextRoundCandidates[i + i];
      round.games[i].player2.id = nextRoundCandidates[i + i + 1];
    }

    return round;
  }
}
