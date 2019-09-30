import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { IUser } from '../core/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class TournoProfileService {

  user: IUser;

  constructor(
    private authService: AuthService
  ) { }

  async checkIfCreator(tourno) {

    let creatorId;
    const currentId = this.authService.getUserLogged.uid;

    if (tourno.userCreated) {
      await tourno.userCreated.get()
        .then((doc) => {
          if (doc.exists) {
            creatorId = doc.id;
          }
        });
    }
    
    return (currentId === creatorId ? true : false);

  }
}
