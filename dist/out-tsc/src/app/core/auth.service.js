import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
let AuthService = class AuthService {
    constructor(afAuth, afs, router, snackBar) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.snackBar = snackBar;
        this.messageSource$ = new BehaviorSubject(null);
        this.errorMessage$ = this.messageSource$.asObservable().pipe(share());
        this.userLoggedSubject$ = new BehaviorSubject(null);
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.afs.collection('users').doc(user.uid).valueChanges().subscribe((res) => {
                    this.userLoggedSubject$.next(res);
                });
            }
            else {
                this.userLoggedSubject$.next(null);
            }
        });
        this.userLoggedSubject$.subscribe((u) => this.user = u);
    }
    get getUserLogged() {
        return this.user;
    }
    get getUserLoggedRef() {
        return this.afs.doc('users/' + this.user.uid).ref;
    }
    get isUserLogged() {
        return (this.user == null ? false : true);
    }
    googleLogin() {
        if (!this.isUserLogged) {
            const provider = new firebase.auth.GoogleAuthProvider();
            return this.oAuthLogin(provider);
        }
        else {
            this.messageSource$.next('You are already signed in. Log out first and try again');
        }
    }
    oAuthLogin(provider) {
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
        }
        else {
            this.messageSource$.next('You are already signed in. Log out first and try again');
        }
    }
    updateUserData(user) {
        // Sets user data to firestore on login
        const userRef = this.afs.doc(`users/${user.uid}`);
        const data = {
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
                return false;
            });
            return res;
        }
        else {
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
        }
        else {
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
        firebase.auth().currentUser.updatePassword(pass).then(function () {
            this.snackBar.open('Password was successfully changed! 👍', '', {
                duration: 3000
            });
        }).catch(function (error) {
            console.error(error);
            this.snackBar.open('Error occured while changing your password. Try again later 👻', '', {
                duration: 3000
            });
        });
    }
    checkIfSocial() {
        return (firebase.auth().currentUser.providerData[0].providerId === 'facebook.com' ||
            firebase.auth().currentUser.providerData[0].providerId === 'google.com') ? true : false;
    }
    deleteUser(user) {
        this.afs.doc('users/' + user.uid).delete().then(() => {
            console.log('Account is deleted from the database');
        })
            .catch((err) => {
            console.log('Could not delete user from database');
            console.error(err);
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
        });
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map