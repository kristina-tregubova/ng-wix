import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase';
let DeletePopupComponent = class DeletePopupComponent {
    constructor(data, dialogRef, router, tournoService, playerService, auth) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.router = router;
        this.tournoService = tournoService;
        this.playerService = playerService;
        this.auth = auth;
    }
    handleDeletion() {
        switch (this.data.collectionName) {
            case 'tournaments':
                this.tournoService.deleteTourno(this.data.itemId);
                this.dialogRef.close();
                this.router.navigate(['/tournos-search']);
                break;
            case 'players':
                this.playerService.deletePlayer(this.data.itemId);
                this.dialogRef.close();
                this.router.navigate(['/players-search']);
                break;
            case 'users':
                this.auth.deleteUser(firebase.auth().currentUser);
                this.dialogRef.close();
                this.router.navigate(['/main']);
        }
    }
    handleClosingPopup() {
        this.dialogRef.close();
    }
};
DeletePopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-success-popup',
        templateUrl: './delete-popup.component.html',
        styleUrls: ['./delete-popup.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA))
], DeletePopupComponent);
export { DeletePopupComponent };
//# sourceMappingURL=delete-popup.component.js.map