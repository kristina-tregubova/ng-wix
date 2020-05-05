import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TournoCardService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  public defineIfFavorite(itemId: string): boolean {
    return this.authService.getUserLogged.favoriteTournos.includes(itemId);
  }

  public addToFavorite(itemId: string): void {
    this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
      favoriteTournos: firebase.firestore.FieldValue.arrayUnion(itemId)
    })
  }

  public removeFromFavorite(itemId: string): void {
    this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
      favoriteTournos: firebase.firestore.FieldValue.arrayRemove(itemId)
    });
  }
}
