import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let CreateNewPlayerPopupComponent = class CreateNewPlayerPopupComponent {
    constructor(data, dialogRef, afs, createNewPlayerPopupService, authService) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.afs = afs;
        this.createNewPlayerPopupService = createNewPlayerPopupService;
        this.authService = authService;
    }
    ngOnInit() {
        this.createNewPlayerDoc().then(ref => {
            this.ref = ref;
        });
    }
    createNewPlayerDoc() {
        return this.createNewPlayerPopupService.createDefaultPlayer();
    }
    handleSavePlayerToDb() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = {
                'id': this.ref.id,
                'name': this.name,
                'playerType': this.data.playerType,
                'country': this.country,
                'game': this.data.game,
                'userCreated': this.authService.getUserLoggedRef,
            };
            this.createNewPlayerPopupService.updateDefaultPlayer(this.ref, data)
                .then(() => {
                console.log('successfully added player');
            })
                .catch((err) => {
                console.error(err);
            });
            this.returnNewPlayer(this.ref);
            this.createNewPlayerPopupService.updateUserInfo(this.ref);
        });
    }
    returnNewPlayer(ref) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield ref.get()
                .then((doc) => {
                if (doc.exists) {
                    return doc.data();
                }
            })
                .then((doc) => {
                this.dialogRef.close(doc);
            });
        });
    }
    cancelCreateNewPlayer() {
        this.createNewPlayerPopupService.deleteNewPlayer(this.ref);
        this.dialogRef.close();
    }
};
CreateNewPlayerPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-create-new-player-popup',
        templateUrl: './create-new-player-popup.component.html',
        styleUrls: ['./create-new-player-popup.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA))
], CreateNewPlayerPopupComponent);
export { CreateNewPlayerPopupComponent };
//# sourceMappingURL=create-new-player-popup.component.js.map