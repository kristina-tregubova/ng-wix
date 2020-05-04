import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DeletePopupComponent } from '../../shared/popups/delete-popup/delete-popup.component';
import { FileUploadPopupComponent } from '../../shared/popups/file-upload-popup/file-upload-popup.component';
let PlayerProfileComponent = class PlayerProfileComponent {
    constructor(route, sanitizer, authService, playerService, playerProfileService, dialog, snackBar) {
        this.route = route;
        this.sanitizer = sanitizer;
        this.authService = authService;
        this.playerService = playerService;
        this.playerProfileService = playerProfileService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.displayedColumns = ['name', 'role'];
        this.isNameEditingDisabled = true;
        this.isTeamEditingDisabled = true;
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.isLogged$ = this.authService.userLoggedSubject$;
        this.sub = this.playerService.getPlayer(this.id)
            .subscribe((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.player = val;
            this.ifCreator = this.authService.getUserLogged ? yield this.playerProfileService.checkIfCreator(this.player) : null;
            this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
            this.dataSource = val.team;
            this.items = this.playerService.getTournamentsAttended(val);
        }));
    }
    handleEnableEditing(type) {
        switch (type) {
            case 'name':
                this.isNameEditingDisabled = !this.isNameEditingDisabled;
                break;
            case 'team':
                this.isTeamEditingDisabled = !this.isTeamEditingDisabled;
                break;
        }
    }
    handleSubmitEditing(type) {
        switch (type) {
            case 'name':
                this.isNameEditingDisabled = true;
                this.playerService.updateField(this.player, this.id, 'name');
                break;
            case 'team':
                this.isTeamEditingDisabled = true;
                this.playerService.updateField(this.player, this.id, 'team');
                break;
        }
    }
    handleAddTeamMember() {
        this.playerService.addTeamMember(this.player, this.id);
    }
    handleOpenDeletePopup() {
        this.dialog.open(DeletePopupComponent, {
            width: '450px',
            data: {
                collectionName: 'players',
                itemId: this.id
            }
        });
    }
    handleOpenFileUploadPopup() {
        console.log(this.id);
        this.dialog.open(FileUploadPopupComponent, {
            width: '450px',
            data: {
                storageName: 'players-logos/',
                playerId: this.id
            }
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
};
PlayerProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-player-profile',
        templateUrl: './player-profile.component.html',
        styleUrls: ['./player-profile.component.scss'],
    })
], PlayerProfileComponent);
export { PlayerProfileComponent };
//# sourceMappingURL=player-profile.component.js.map