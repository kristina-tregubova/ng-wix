import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { IUser } from 'src/app/core/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class TournoCardService {

  user: IUser;
  userId: string;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }


  defineIfFavorite(itemId) {
     return this.user.favoriteTournos.includes(itemId); 
  }

  addToFavorite(itemId) {
    this.afs.collection('users').doc(this.userId).update({
      favoriteTornos: firebase.firestore.FieldValue.arrayUnion(itemId)
    })
  }

  removeFromFavorite(itemId) {
    this.afs.collection('users').doc(this.userId).update({
      favoriteTornos: firebase.firestore.FieldValue.arrayRemove(itemId)
    })
  }

  getUser(): IUser {
    this.authService.userLoggedSubject$.subscribe((u) => {
      if (u) {
        this.user = u;
        this.userId = u.uid;
      }
    });
    return this.user;
  }
}
