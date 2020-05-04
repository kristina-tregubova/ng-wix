import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { IUser } from 'src/app/core/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class TournoCardService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) {}


  defineIfFavorite(itemId) {
     return this.authService.getUserLogged.favoriteTournos.includes(itemId);
  }

  addToFavorite(itemId) {
    this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
      favoriteTournos: firebase.firestore.FieldValue.arrayUnion(itemId)
    })
  }

  removeFromFavorite(itemId) {
    this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
      favoriteTournos: firebase.firestore.FieldValue.arrayRemove(itemId)
    });
  }
}
