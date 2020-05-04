import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/IUser';
import { PlayerCardService } from '../../shared/components/players-list/player-card/player-card.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerProfileService {

  user: IUser;

  constructor(
    private authService: AuthService
  ) {}

  async checkIfCreator(player) {
    let creatorId;
    const currentId = this.authService.getUserLogged.uid;

    if (player.userCreated) {
      await player.userCreated.get()
        .then((doc) => {
          if (doc.exists) {
            creatorId = doc.id;
          }
        });
    }

    return (currentId === creatorId ? true : false);

  }
}
