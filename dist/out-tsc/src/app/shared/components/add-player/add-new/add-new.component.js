import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CreateNewPlayerPopupComponent } from '../../../popups/create-new-player-popup/create-new-player-popup.component';
let AddNewComponent = class AddNewComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.createdPlayers = [];
        this.newChosenPlayer = new EventEmitter();
    }
    ngOnInit() {
    }
    handleOpenCreateNewPopup() {
        let dialogRef = this.dialog.open(CreateNewPlayerPopupComponent, {
            width: '450px',
            data: {
                'game': this.tournoInfo.game,
                'playerType': this.tournoInfo.playerType
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.createdPlayers.push(result);
            }
        });
    }
    handleAddChosenPlayers(player) {
        this.newChosenPlayer.emit(player);
    }
};
tslib_1.__decorate([
    Output()
], AddNewComponent.prototype, "newChosenPlayer", void 0);
tslib_1.__decorate([
    Input()
], AddNewComponent.prototype, "tournoInfo", void 0);
AddNewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-new',
        templateUrl: './add-new.component.html',
        styleUrls: ['./add-new.component.scss']
    })
], AddNewComponent);
export { AddNewComponent };
//# sourceMappingURL=add-new.component.js.map