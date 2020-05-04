import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DeletePopupComponent } from '../../shared/popups/delete-popup/delete-popup.component';
let TournoProfileComponent = class TournoProfileComponent {
    constructor(route, sanitizer, authService, tournoService, tournoProfileService, playerService, dialog) {
        this.route = route;
        this.sanitizer = sanitizer;
        this.authService = authService;
        this.tournoService = tournoService;
        this.tournoProfileService = tournoProfileService;
        this.playerService = playerService;
        this.dialog = dialog;
        this.isBracketEditingDisabled = true;
        this.isNameEditingDisabled = true;
        this.isStartDateEditingDisabled = true;
        this.isEndDateEditingDisabled = true;
        this.isPrizeEditingDisabled = true;
        this.isEntryFeeEditingDisabled = true;
        this.ifFinished = false;
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.isLogged$ = this.authService.userLoggedSubject$;
        this.sub = this.tournoService.getTourno(this.id)
            .subscribe((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.tourno = val;
            this.ifCreator = this.authService.getUserLogged ? yield this.tournoProfileService.checkIfCreator(this.tourno) : null;
            this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
            this.items$ = this.tournoService.getRelatedPlayers(val);
            this.rounds = val.rounds;
            this.ifFinished = val.status === 'completed' ? true : false;
        }));
    }
    handleEnableBracketEditing() {
        this.isBracketEditingDisabled = !this.isBracketEditingDisabled;
    }
    handleCancelBracketEditing() {
        this.isBracketEditingDisabled = true;
    }
    handleSubmitBracketEditing() {
        this.isBracketEditingDisabled = true;
        this.tourno.rounds = this.tournoProfileService.updateRoundsInfo(this.tourno.rounds);
        this.tournoService.updateTournoStatus(this.id, 'in progress');
        this.playerService.updateTournoWinner(this.gameWinner, this.id);
        this.playerService.updateTournoLoser(this.gameLoser, this.id);
        this.tournoService.updateRounds(this.tourno, this.id);
    }
    handleFinishTournament() {
        this.handleSubmitBracketEditing();
        this.tournoService.updateTournoStatus(this.id, 'completed');
        this.ifFinished = true;
    }
    handleEnableEditing(type) {
        switch (type) {
            case 'name':
                this.isNameEditingDisabled = !this.isNameEditingDisabled;
                break;
            case 'startDate':
                this.isStartDateEditingDisabled = !this.isStartDateEditingDisabled;
                break;
            case 'endDate':
                this.isEndDateEditingDisabled = !this.isEndDateEditingDisabled;
                break;
            case 'entryFee':
                this.isEntryFeeEditingDisabled = !this.isEntryFeeEditingDisabled;
                break;
            case 'prize':
                this.isPrizeEditingDisabled = !this.isPrizeEditingDisabled;
                break;
        }
    }
    handleSubmitEditing(type) {
        switch (type) {
            case 'name':
                this.isNameEditingDisabled = true;
                this.tournoService.updateField(this.tourno, this.id, 'name');
                break;
            case 'startDate':
                this.isStartDateEditingDisabled = true;
                this.tournoService.updateField(this.tourno, this.id, 'startDate');
                break;
            case 'endDate':
                this.isEndDateEditingDisabled = true;
                this.tournoService.updateField(this.tourno, this.id, 'endDate');
                break;
            case 'entryFee':
                this.isEntryFeeEditingDisabled = true;
                this.tournoService.updateField(this.tourno, this.id, 'entryFee');
                break;
            case 'prize':
                this.isPrizeEditingDisabled = true;
                this.tournoService.updateField(this.tourno, this.id, 'prize');
                break;
        }
    }
    handleOpenDeletePopup() {
        this.dialog.open(DeletePopupComponent, {
            width: '450px',
            data: {
                collectionName: 'tournaments',
                itemId: this.id
            }
        });
    }
    setWinner($event) {
        this.gameWinner = $event.winner;
        this.gameLoser = $event.loser;
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
};
TournoProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tourno-profile',
        templateUrl: './tourno-profile.component.html',
        styleUrls: ['./tourno-profile.component.scss']
    })
], TournoProfileComponent);
export { TournoProfileComponent };
//# sourceMappingURL=tourno-profile.component.js.map