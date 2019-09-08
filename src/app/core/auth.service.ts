import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { IUser } from './models/IUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private messageSource$ = new BehaviorSubject<string>(null);
  errorMessage$ = this.messageSource$.asObservable().pipe(share());

  user$: Observable<IUser>;
  userState$ = new BehaviorSubject<IUser>(null);
  isLogged$ = this.userState$.asObservable().pipe(share());
  user: IUser | null;


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

  get isUserLogged() {
    this.isLogged$.subscribe((user) => {
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
        this.router.navigate(['/tournos-search']);
        this.userState$.next(credential.user);
        this.messageSource$.next(null);
      })
      .catch((err) => {
        this.messageSource$.next(err);
      })
  }

  facebookLogin() {

    if (!this.isUserLogged) {

      const provider = new firebase.auth.FacebookAuthProvider();

      this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.updateUserData(credential.user);
          this.router.navigate(['/tournos-search']);
          this.userState$.next(credential.user);
          this.messageSource$.next(null);
        })
        .catch((err) => {
          this.messageSource$.next(err);
        })

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
      // createdTournaments: user.createdTournaments,
      // createdPlayers: user.createdPlayers
      createdTournaments: null,
      createdPlayers: null,
    };

    return userRef.set(data, { merge: true });

  }

  signup(value) {
    if (!this.isUserLogged) {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then((credential) => {
          this.updateUserData(credential.user);
          this.userState$.next(credential.user);
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
          this.userState$.next(credential.user);
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
        this.userState$.next(null);
        this.router.navigate(['/']);
      });
  }

}
