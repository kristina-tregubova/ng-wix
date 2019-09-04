import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IUser } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider)
    return await this.updateUserData(credential.user);
  }

  async facebookLogin() {
    const provider = await new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
    return this.updateUserData(credential.user);

  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      // createdTournaments: user.createdTournaments,
      // createdPlayers: user.createdPlayers
      createdTournaments: null,
      createdPlayers: null,
    };

    return userRef.set(data, { merge: true });

  }

  signup(value) {
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then((credential) => {
        console.log(credential, 'user created!')
        this.updateUserData(credential.user);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  login(value) {
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then((credential) => {
      console.log(credential, 'user logged in!')
      this.updateUserData(credential.user);
    })
      .catch((err) => {
        console.log(err);
      })
  }


  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
