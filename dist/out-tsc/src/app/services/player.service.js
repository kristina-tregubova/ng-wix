import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
let PlayerService = class PlayerService {
    constructor(afs, snackBar) {
        this.afs = afs;
        this.snackBar = snackBar;
        this.emptyTeamMember = { name: '', role: '' };
    }
    getPlayer(id) {
        return this.afs.collection('players').doc(id).valueChanges();
    }
    getPlayerGames(relatedTournaments) {
        return relatedTournaments.length;
    }
    getPlayerWins(relatedTournaments) {
        let wins = 0;
        for (let tourno of relatedTournaments) {
            if (tourno.isWinner) {
                wins++;
            }
        }
        return wins;
    }
    getPlayerLogo(ref) {
        return firebase.storage().refFromURL(ref);
    }
    getTournamentsAttended(player) {
        const items = [];
        if (player.relatedTournaments) {
            for (const tourno of player.relatedTournaments) {
                tourno.tournament.get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        const id = doc.id;
                        items.push(Object.assign({ id }, data));
                    }
                });
            }
        }
        return items;
    }
    addTeamMember(player, playerId) {
        let teamArr = player.team;
        teamArr.push(this.emptyTeamMember);
        this.afs.collection('players').doc(playerId).update({
            'team': teamArr
        }).then(() => {
            this.snackBar.open('Team member was successfully added! 👍', '', {
                duration: 3000
            });
        }).catch((error) => {
            this.snackBar.open('Error occured while adding team member. Try again later. 👻', '', {
                duration: 3000
            });
            console.error(error);
        });
    }
    updateField(player, playerId, field) {
        let updateInfo = {};
        updateInfo['' + field] = player[field];
        this.afs.collection('players').doc(playerId).update(updateInfo).then(() => {
            console.log('Document successfully updated!');
        }).catch((error) => {
            console.error('Error updating document: ', error);
        });
    }
    updatePlayerInfo(player) {
        if (player.relatedTournaments.length !== 0) {
            const games = this.getPlayerGames(player.relatedTournaments);
            const wins = this.getPlayerWins(player.relatedTournaments);
            this.afs.collection('players').doc(player.id).update({
                games,
                wins,
            });
        }
    }
    updateTournoWinner(winnerId, tournoId) {
        this.afs.collection('players').doc(winnerId).valueChanges().subscribe((val) => {
            val.relatedTournaments.map((el) => {
                if (el.tournament.id === tournoId) {
                    el.isWinner = true;
                }
                ;
                return el;
            });
            this.afs.collection('players').doc(winnerId).update({
                relatedTournaments: val.relatedTournaments
            });
        });
    }
    updateTournoLoser(loserId, tournoId) {
        this.afs.collection('players').doc(loserId).valueChanges().subscribe((val) => {
            val.relatedTournaments.map((el) => {
                if (el.tournament.id === tournoId) {
                    el.isWinner = false;
                }
                ;
                return el;
            });
            this.afs.collection('players').doc(loserId).update({
                relatedTournaments: val.relatedTournaments
            });
        });
    }
    deletePlayer(playerId) {
        this.afs.collection('players').doc(playerId).delete().then(() => {
            this.snackBar.open('Player was successfully deleted! 👍', '', {
                duration: 3000
            });
            console.log('Document successfully deleted!');
        }).catch((error) => {
            this.snackBar.open('Error occured while deleting this player. Try again later 👻', '', {
                duration: 3000
            });
            console.error('Error removing document: ', error);
        });
    }
};
PlayerService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PlayerService);
export { PlayerService };
//# sourceMappingURL=player.service.js.map