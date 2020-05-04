import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let PlayerProfileService = class PlayerProfileService {
    constructor(authService) {
        this.authService = authService;
    }
    checkIfCreator(player) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let creatorId;
            const currentId = this.authService.getUserLogged.uid;
            if (player.userCreated) {
                yield player.userCreated.get()
                    .then((doc) => {
                    if (doc.exists) {
                        creatorId = doc.id;
                    }
                });
            }
            return (currentId === creatorId ? true : false);
        });
    }
};
PlayerProfileService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PlayerProfileService);
export { PlayerProfileService };
//# sourceMappingURL=player-profile.service.js.map