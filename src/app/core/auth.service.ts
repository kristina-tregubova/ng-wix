import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

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

    this.userLoggedSubject$.subscribe((u) => this.user = u)

  }

  get getUserLogged() {
    return this.user;
  }

  get getUserLoggedRef(): DocumentReference {
    return this.afs.doc('users/' + this.user.uid).ref;
  }


  get isUserLogged() {
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
      favoritePlayers: [],
      favoriteTournos: [],
      createdTournaments: [],
      createdPlayers: []
    };

    return userRef.set(data, { merge: true });

  }

  signup(value) {
    if (!this.isUserLogged) {

      const res = firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then((credential) => {
          this.updateUserData(credential.user);
          this.messageSource$.next(null);
          return true;
        })
        .catch((err) => {
          console.log(err);
          this.messageSource$.next(err);
          return false
        });
        
      return res;
    } else {
      this.messageSource$.next('You are already signed in. Log out first and try again');
      return false;
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

  updatePassword(pass) {
    console.log(firebase.auth().currentUser);
    firebase.auth().currentUser.updatePassword(pass).then(function() {
      console.log('Update successful.')
    }).catch(function(error) {
      console.log('An error happened. Try again later.');
    });
  }

  checkIfSocial() {
    return (firebase.auth().currentUser.providerData[0].providerId === 'facebook.com' ||
    firebase.auth().currentUser.providerData[0].providerId === 'google.com') ? true : false;
  }
}
