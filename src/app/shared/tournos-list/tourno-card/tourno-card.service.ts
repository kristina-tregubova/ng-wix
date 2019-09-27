import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
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
  ) {
    this.user = this.authService.getUserLogged;
   }


  defineIfFavorite(itemId) {
     return this.user.favoriteTournos.includes(itemId);
  }

  addToFavorite(itemId) {
    this.afs.collection('users').doc(this.userId).update({
      favoriteTournos: firebase.firestore.FieldValue.arrayUnion(itemId)
    })
  }

  removeFromFavorite(itemId) {
    this.afs.collection('users').doc(this.userId).update({
      favoriteTournos: firebase.firestore.FieldValue.arrayRemove(itemId)
    });
  }
}
