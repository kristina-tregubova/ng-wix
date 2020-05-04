import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

import { IUser } from '../models/IUser';
import { MatSnackBar } from '@angular/material';


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
    private router: Router,
    private snackBar: MatSnackBar
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

  get getUserLogged(): IUser {
    return this.user;
  }

  get getUserLoggedRef(): DocumentReference {
    return this.afs.doc('users/' + this.user.uid).ref;
  }


  get isUserLogged(): boolean {
    return !(this.user == null);
  }


  public googleLogin(): void {
    if (!this.isUserLogged) {

      const provider = new firebase.auth.GoogleAuthProvider();
      return this.oAuthLogin(provider);

    } else {
      this.messageSource$.next('You are already signed in. Log out first and try again');
    }

  }

  private oAuthLogin(provider: firebase.auth.AuthProvider): void {

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

  public facebookLogin(): void {

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


  private updateUserData(user: IUser): Promise<void> {
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

  // subject to refactoring
  public signup(value: { email: string, password: string }): boolean | Promise<boolean> {
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

  public login(value: { email: string, password: string }): void {
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


  public logout(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  public updatePassword(pass: string) {
    console.log(firebase.auth().currentUser);
    firebase.auth().currentUser.updatePassword(pass).then(function () {
      this.snackBar.open('Password was successfully changed! 👍', '', {
        duration: 3000
      });
    }).catch(function (error) {
      console.error(error)
      this.snackBar.open('Error occured while changing your password. Try again later 👻', '', {
        duration: 3000
      });
    });
  }

  public checkIfSocial(): boolean {
    return (firebase.auth().currentUser.providerData[0].providerId === 'facebook.com' ||
      firebase.auth().currentUser.providerData[0].providerId === 'google.com');
  }

  // sunject to refactoring --> unclear type
  public deleteUser(user: DocumentReference & IUser): void {
    this.afs.doc('users/' + user.uid).delete().then(() => {
      console.log('Account is deleted from the database')
    })
      .catch((err) => {
        console.log('Could not delete user from database')
        console.error(err)
      });
    user.delete().then(() => {
      this.snackBar.open('Account was successfully deleted! 👍', '', {
        duration: 3000
      });
    })
      .catch((err) => {
        this.snackBar.open('Error occured while deleting your account. Try again later 👻', '', {
          duration: 3000
        });
        console.error(err);
      })

  }
}
