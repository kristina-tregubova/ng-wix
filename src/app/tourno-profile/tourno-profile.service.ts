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
}
