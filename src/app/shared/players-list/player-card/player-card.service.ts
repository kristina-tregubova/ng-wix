import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/models/IUser';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PlayerCardService {

  user: IUser;
  userId: string;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { 
    this.user = this.authService.getUserLogged;
  }


  defineIfFavorite(itemId) {
     return this.user.favoritePlayers.includes(itemId); 
  }

  addToFavorite(itemId) {
    this.afs.collection('users').doc(this.userId).update({
      favoritePlayers: firebase.firestore.FieldValue.arrayUnion(itemId)
    })
  }

  removeFromFavorite(itemId) {
    this.afs.collection('users').doc(this.userId).update({
      favoritePlayers: firebase.firestore.FieldValue.arrayRemove(itemId)
    })
  }
}
