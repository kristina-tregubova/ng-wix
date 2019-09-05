import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, throwError } from 'rxjs';
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

  private async oAuthLogin(provider): Promise<boolean> {
    if (this.user$ === null) {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      await this.updateUserData(credential.user);
      if (credential) {
        this.updateUserData(credential.user);
        this.router.navigate(['/tournos-search']);
        return true;
      }
    }
    return false;
  }

  async facebookLogin(): Promise<boolean> {
    if (this.user$ === null) {
      const provider = await new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      if (credential) {
        this.updateUserData(credential.user);
        this.router.navigate(['/tournos-search']);
        return true;
      }
    }
    return false;
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

  signup(value): boolean {
    if (this.user$ === null) {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then((credential) => {
          this.updateUserData(credential.user);
        })
        .catch((err) => {
          console.log(err);
          this.showErrorMessage(err);
        });
      return true;
    }
    return false;
  }

  login(value): boolean {
    if (this.user$ === null) {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then((credential) => {
          this.updateUserData(credential.user);
          this.router.navigate(['/tournos-search']);

        })
        .catch((err) => {
          console.log(err);
          this.showErrorMessage(err);
        });
      return true;
    }
    return false;
  }


  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  showErrorMessage(message?: string) {
    
  }
}
