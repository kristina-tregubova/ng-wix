import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
let TournoService = class TournoService {
    constructor(afs, authService, snackBar) {
        this.afs = afs;
        this.authService = authService;
        this.snackBar = snackBar;
    }
    getTourno(id) {
        return this.afs.collection('tournaments').doc(id).valueChanges();
    }
    getRelatedPlayers(tourno) {
        let items;
        if (tourno.relatedPlayers) {
            items = [];
            for (const player of tourno.relatedPlayers) {
                player.get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        const id = doc.id;
                        items.push(Object.assign({ id }, data));
                    }
                });
            }
            return of(items);
        }
    }
    updateField(tourno, tournoId, field) {
        const updateInfo = {};
        updateInfo['' + field] = tourno[field];
        this.afs.collection('tournaments').doc(tournoId).update(updateInfo).then(() => {
            console.log('Document successfully updated!');
        }).catch((error) => {
            console.error('Error updating document: ', error);
        });
    }
    updateTournoStatus(tournoId, status) {
        this.afs.collection('tournaments').doc(tournoId).update({
            status: status
        }).then(() => {
            console.log('Status successfully updated!');
        }).catch((error) => {
            console.error('Error updating status: ', error);
        });
    }
    updateRounds(tourno, id) {
        this.afs.collection('tournaments').doc(id).update({
            rounds: tourno.rounds
        }).then(() => {
            this.snackBar.open('Points were successfully updated! 👍', '', {
                duration: 3000
            });
            console.log('Document successfully updated!');
        }).catch((error) => {
            this.snackBar.open('Error occured while save game results. Try again later 👻', '', {
                duration: 3000
            });
            console.error('Error updating document: ', error);
        });
    }
    deleteTourno(tournoId) {
        this.afs.collection('tournaments').doc(tournoId).delete().then(() => {
            this.snackBar.open('Tournament was successfully deleted! 👍', '', {
                duration: 3000
            });
            console.log('Document successfully deleted!');
        }).catch((error) => {
            this.snackBar.open('Error occured while deleting this tournament. Try again later 👻', '', {
                duration: 3000
            });
            console.error('Error removing document: ', error);
        });
    }
};
TournoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TournoService);
export { TournoService };
//# sourceMappingURL=tourno.service.js.map