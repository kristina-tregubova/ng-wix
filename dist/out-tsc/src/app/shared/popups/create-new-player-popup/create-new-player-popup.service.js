import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
let CreateNewPlayerPopupService = class CreateNewPlayerPopupService {
    constructor(afs, authService, snackBar) {
        this.afs = afs;
        this.authService = authService;
        this.snackBar = snackBar;
        this.defaultPlayer = {
            id: null,
            name: null,
            playerType: null,
            game: null,
            country: null,
            userCreated: null,
            relatedTournaments: [],
            team: [],
            wins: 0,
            games: 0,
            logoRef: './assets/images/avatars/avatar.svg',
        };
    }
    createDefaultPlayer() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const defaultTournoRef = this.afs.collection('players').add(this.defaultPlayer)
                .then((docRef) => {
                return docRef;
            });
            return defaultTournoRef;
        });
    }
    updateDefaultPlayer(ref, data) {
        return ref.update(data).then(() => {
            this.snackBar.open('Player was successfully created! 👍', '', {
                duration: 3000
            });
        })
            .catch((err) => {
            this.snackBar.open('Error occured while creating a player. Try again later 👻', '', {
                duration: 3000
            });
            console.error(err);
        });
    }
    updateUserInfo(ref) {
        this.authService.getUserLoggedRef.update({
            'createdPlayers': firebase.firestore.FieldValue.arrayUnion(ref)
        });
    }
    deleteNewPlayer(ref) {
        return ref.delete();
    }
};
CreateNewPlayerPopupService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CreateNewPlayerPopupService);
export { CreateNewPlayerPopupService };
//# sourceMappingURL=create-new-player-popup.service.js.map