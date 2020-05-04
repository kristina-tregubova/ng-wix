import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
let TournoCreationService = class TournoCreationService {
    constructor(afs, authService, playerService, snackBar) {
        this.afs = afs;
        this.authService = authService;
        this.playerService = playerService;
        this.snackBar = snackBar;
        this.defaultTourno = {
            id: null,
            name: null,
            tournamentType: null,
            status: 'pending',
            game: null,
            country: null,
            participants: null,
            playerType: null,
            endDate: null,
            startDate: null,
            entryFee: null,
            prize: null,
            description: null,
            relatedPlayers: null,
            rounds: [],
            userCreated: this.authService.getUserLoggedRef,
        };
    }
    createDefaultTourno() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const defaultTournoRef = this.afs.collection('tournaments').add(this.defaultTourno)
                .then((docRef) => {
                return docRef;
            });
            return defaultTournoRef;
        });
    }
    updateDefaultTourno(ref, data) {
        return ref.update(data);
    }
    updateUserInfo(ref) {
        this.authService.getUserLoggedRef.update({
            createdTournos: firebase.firestore.FieldValue.arrayUnion(ref)
        });
    }
    updateTournoInfoForPlayers(relatedPlayers, ref) {
        const newTournoField = {
            isWinner: false,
            pointsGained: 0,
            tournament: ref
        };
        for (let playerRef of relatedPlayers) {
            playerRef.update({
                'relatedTournaments': firebase.firestore.FieldValue.arrayUnion(newTournoField)
            });
        }
    }
    updateRelatedPlayers(val, ref) {
        ref.update({
            relatedPlayers: val
        });
    }
    updateRounds(rounds, ref) {
        const res = ref.update({
            rounds
        });
        return res;
    }
    seedPlayers(ifRandom, ref) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const playersArr = yield ref.get().then((doc) => {
                if (doc.exists) {
                    return doc.data().relatedPlayers;
                }
            });
            if (ifRandom) {
                this.shuffleArray(playersArr);
            }
            return playersArr;
        });
    }
    generateBracket(participantsNumber, chosenPlayers) {
        let numberOfRounds = this.defineRoundsNumber(participantsNumber);
        let numberOfGames = this.defineGamesNumber(participantsNumber);
        const rounds = [];
        for (let i = 0; i < numberOfRounds; i++) {
            if (numberOfGames > 1) {
                let round;
                if (i === 0) {
                    round = this.createRoundWithPlayers(numberOfGames, chosenPlayers);
                }
                else {
                    round = this.createRound(numberOfGames);
                }
                rounds.push(round);
                numberOfGames = numberOfGames / 2;
            }
            else if (numberOfGames === 1) {
                const round = this.createRound(1);
                rounds.push(round);
            }
        }
        return rounds;
    }
    createRoundWithPlayers(numberOfGames, roundCandidates) {
        const round = {
            games: [],
            nextRoundCandidates: [],
        };
        for (let i = 0; i < numberOfGames; i++) {
            const game = this.createGameWithPlayers(roundCandidates[i + i], roundCandidates[i + i + 1]);
            round.games.push(game);
        }
        return round;
    }
    createRound(numberOfGames) {
        const round = {
            games: [],
            nextRoundCandidates: []
        };
        for (let i = 0; i < numberOfGames; i++) {
            const game = this.createGame();
            round.games.push(game);
        }
        return round;
    }
    createGameWithPlayers(p1, p2) {
        const game = {
            player1: {
                id: p1.id,
                points: null
            },
            player2: {
                id: p2.id,
                points: null
            },
            gameWinner: null
        };
        return game;
    }
    createGame() {
        const game = {
            player1: {
                id: null,
                points: null
            },
            player2: {
                id: null,
                points: null
            },
            gameWinner: null
        };
        return game;
    }
    defineRoundsNumber(num) {
        let k = 0;
        do {
            k++;
            num = num / 2;
        } while (num !== 1);
        return k;
    }
    defineGamesNumber(num) {
        return num / 2;
    }
    deleteTourno(ref) {
        ref.delete().then(() => {
            this.snackBar.open('Tournament was successfully deleted! 👍', '', {
                duration: 3000
            });
        }).catch((error) => {
            this.snackBar.open('Error occured while deleting this tournament. Try again later 👻', '', {
                duration: 3000
            });
            console.error(error);
        });
    }
    // Fisher-Yates shuffle
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};
TournoCreationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TournoCreationService);
export { TournoCreationService };
//# sourceMappingURL=tourno-creation.service.js.map