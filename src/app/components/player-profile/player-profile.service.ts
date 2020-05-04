import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/IUser';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Injectable({
  providedIn: 'root'
})

export class PlayerProfileService {

  user: IUser;

  constructor(
    private authService: AuthService
  ) {}

  public async checkIfCreator(player: IPlayer): Promise<boolean> {
    
    let creatorId: string;
    const currentId = this.authService.getUserLogged.uid;

    if (player.userCreated) {
      await player.userCreated.get()
        .then((doc) => {
          if (doc.exists) {
            creatorId = doc.id;
          }
        });
    }

    return currentId === creatorId;

  }
}
