import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { share, mergeMap } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { IUser } from './models/IUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private messageSource$ = new BehaviorSubject<string>(null);
  errorMessage$ = this.messageSource$.asObservable().pipe(share());

  userLoggedSubject$: BehaviorSubject<IUser>;
  user: IUser | null;


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    this.userLoggedSubject$ = new BehaviorSubject(null);

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.afs.collection('users').doc<IUser>(user.uid).valueChanges().subscribe((res) => {
          this.userLoggedSubject$.next(res);
        });
      } else {
        this.userLoggedSubject$.next(null);
      }

    });

  }


  get isUserLogged() {
    this.userLoggedSubject$.subscribe((user) => {
      this.user = user;
    });
    return (this.user == null ? false : true);
  }


  googleLogin() {
    if (!this.isUserLogged) {

      const provider = new firebase.auth.GoogleAuthProvider();
      return this.oAuthLogin(provider);

    } else {
      this.messageSource$.next('You are already signed in. Log out first and try again');
    }

  }

  private oAuthLogin(provider) {

    this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.messageSource$.next(null);
        this.router.navigate(['/tournos-search']);
      })
      .catch((err) => {
        this.messageSource$.next(err);
      });
  }

  facebookLogin() {

    if (!this.isUserLogged) {

      const provider = new firebase.auth.FacebookAuthProvider();

      this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.updateUserData(credential.user);
          this.messageSource$.next(null);
          this.router.navigate(['/tournos-search']);
        })
        .catch((err) => {
          this.messageSource$.next(err);
        });

    } else {
      this.messageSource$.next('You are already signed in. Log out first and try again');

    }
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      // favoritePlayers: user.favoritePlayers,
      // favoriteTournos: user.favoriteTournos,
      // createdTournaments: user.createdTournaments,
      // createdPlayers: user.createdPlayers,
    };

    return userRef.set(data, { merge: true });

  }

  signup(value) {
    if (!this.isUserLogged) {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then((credential) => {
          this.updateUserData(credential.user);
        })
        .catch((err) => {
          console.log(err);
          this.messageSource$.next(err);
        });
      this.messageSource$.next(null);
      return true;
    } else {
      this.messageSource$.next('You are already signed in. Log out first and try again');
    }
  }

  login(value) {
    if (!this.isUserLogged) {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then((credential) => {
          this.updateUserData(credential.user);
          this.router.navigate(['/tournos-search']);
        })
        .catch((err) => {
          console.log(err);
          this.messageSource$.next(err);
        });
      this.messageSource$.next(null);
    } else {
      this.messageSource$.next('You are already signed in. Log out first and try again');
    }
  }


  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

}
