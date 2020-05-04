import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let TournoProfileService = class TournoProfileService {
    constructor(authService) {
        this.authService = authService;
    }
    checkIfCreator(tourno) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let creatorId;
            const currentId = this.authService.getUserLogged.uid;
            if (tourno.userCreated) {
                yield tourno.userCreated.get()
                    .then((doc) => {
                    if (doc.exists) {
                        creatorId = doc.id;
                    }
                });
            }
            return (currentId === creatorId ? true : false);
        });
    }
    updateRoundsInfo(rounds) {
        for (let i = 0; i < (rounds.length - 1); i++) {
            const nextRoundCandidates = rounds[i].nextRoundCandidates;
            rounds[i + 1] = this.updateRoundWithPlayers(rounds[i + 1], nextRoundCandidates);
        }
        return rounds;
    }
    updateRoundWithPlayers(round, nextRoundCandidates) {
        for (let i = 0; i < round.games.length; i++) {
            round.games[i].player1.id = nextRoundCandidates[i + i];
            round.games[i].player2.id = nextRoundCandidates[i + i + 1];
        }
        return round;
    }
};
TournoProfileService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TournoProfileService);
export { TournoProfileService };
//# sourceMappingURL=tourno-profile.service.js.map