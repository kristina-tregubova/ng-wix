import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
let TournoCardService = class TournoCardService {
    constructor(afs, authService) {
        this.afs = afs;
        this.authService = authService;
    }
    defineIfFavorite(itemId) {
        return this.authService.getUserLogged.favoriteTournos.includes(itemId);
    }
    addToFavorite(itemId) {
        this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
            favoriteTournos: firebase.firestore.FieldValue.arrayUnion(itemId)
        });
    }
    removeFromFavorite(itemId) {
        this.afs.collection('users').doc(this.authService.getUserLogged.uid).update({
            favoriteTournos: firebase.firestore.FieldValue.arrayRemove(itemId)
        });
    }
};
TournoCardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TournoCardService);
export { TournoCardService };
//# sourceMappingURL=tourno-card.service.js.map