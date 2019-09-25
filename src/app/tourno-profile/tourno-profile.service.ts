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

  getUser() {
    this.authService.userLoggedSubject$.subscribe((u) => {
      if (u) {
        this.user = u;
      }
    });
    return this.user;
  }

  async checkIfCreator(tourno) {
    let creatorId;
    let currentId = this.user.uid;

    await tourno.userCreated.get()
      .then((doc) => {
        if (doc.exists) {
          creatorId = doc.id;
        }
      });

    return (currentId === creatorId ? true : false);

  }
}
