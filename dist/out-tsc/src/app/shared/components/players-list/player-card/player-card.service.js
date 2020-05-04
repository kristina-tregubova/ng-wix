import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
let PlayerCardService = class PlayerCardService {
    constructor(afs, authService) {
        this.afs = afs;
        this.authService = authService;
        // this.user = this.authService.getUserLogged;
    }
    defineIfFavorite(itemId) {
        return this.authService.getUserLogged.favoritePlayers.includes(itemId);
    }
    addToFavorite(itemId) {
        this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
            favoritePlayers: firebase.firestore.FieldValue.arrayUnion(itemId)
        });
    }
    removeFromFavorite(itemId) {
        this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
            favoritePlayers: firebase.firestore.FieldValue.arrayRemove(itemId)
        });
    }
};
PlayerCardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PlayerCardService);
export { PlayerCardService };
//# sourceMappingURL=player-card.service.js.map