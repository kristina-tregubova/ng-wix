import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
let TournoCreationComponent = class TournoCreationComponent {
    constructor(formBuilder, tournoCreationService, router, snackBar) {
        this.formBuilder = formBuilder;
        this.tournoCreationService = tournoCreationService;
        this.router = router;
        this.snackBar = snackBar;
        this.isLinear = true;
        this.ifDelete = true;
    }
    /** Returns a FormArray with the name 'formArray'. */
    get formArray() { return this.formGroup.get('formArray'); }
    ngOnInit() {
        this.createForm();
        this.createNewTournoDoc().then(ref => {
            this.ref = ref;
            this.bindFormToDoc();
        });
    }
    createForm() {
        this.formGroup = this.formBuilder.group({
            formArray: this.formBuilder.array([
                this.formBuilder.group({
                    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
                    tournamentType: ['', Validators.required],
                    country: ['', Validators.required],
                    game: ['', Validators.required],
                    playerType: ['', Validators.required],
                    description: ['', Validators.maxLength(200)],
                }),
                this.formBuilder.group({
                    startDate: ['', Validators.required],
                    endDate: ['', Validators.required],
                    entryFee: ['', Validators.maxLength(30)],
                    prize: ['', Validators.maxLength(30)],
                }),
                this.formBuilder.group({
                    participants: ['', Validators.required]
                }),
            ])
        });
    }
    createNewTournoDoc() {
        return this.tournoCreationService.createDefaultTourno();
    }
    bindFormToDoc() {
        this.formGroup.patchValue(this.ref);
    }
    handleSeedPlayers(ifRandom) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tournoCreationService.seedPlayers(ifRandom, this.ref);
        });
    }
    handleUpdateRelatedPlayers(val) {
        this.tournoCreationService.updateRelatedPlayers(val, this.ref);
    }
    saveFormChanges(numberRef) {
        const data = this.formGroup.get('formArray').get([numberRef]).value;
        data['id'] = this.ref.id;
        this.tournoCreationService.updateDefaultTourno(this.ref, data);
    }
    setIfRandom(val) {
        this.ifRandom = val;
    }
    checkBeforeSaveTournament(numberRef, ifRandom) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.formGroup.status != 'VALID') {
                console.log('form is not valid, cannot save data');
                return;
            }
            let participantsNumber = yield this.formGroup.get('formArray').get([2]).get('participants').value;
            let chosenPlayers = yield this.handleSeedPlayers(ifRandom);
            if (+participantsNumber === +chosenPlayers.length) {
                this.saveTournament(numberRef, participantsNumber, chosenPlayers);
            }
            else {
                this.snackBar.open('Chosen number players and participants number do not correspond. Add or remove some 🏃', '', {
                    duration: 3000
                });
            }
        });
    }
    saveTournament(numberRef, participantsNumber, chosenPlayers) {
        this.ifDelete = false;
        // save last part
        this.saveFormChanges(numberRef);
        this.tournoCreationService.updateUserInfo(this.ref);
        this.tournoCreationService.updateTournoInfoForPlayers(chosenPlayers, this.ref);
        // tourno/rounds building methods
        let rounds = this.tournoCreationService.generateBracket(participantsNumber, chosenPlayers);
        this.tournoCreationService.updateRounds(rounds, this.ref)
            .then(() => {
            this.snackBar.open('Tournament was successfully created! 👍', '', {
                duration: 3000
            });
        }).catch((error) => {
            this.snackBar.open('Error occured while creating a tournament. Try again later 👻', '', {
                duration: 3000
            });
            console.error(error);
        });
        this.router.navigate(['/tourno-profile/' + this.ref.id]);
    }
    cancelTournoCreation() {
        this.tournoCreationService.deleteTourno(this.ref);
    }
    canDeactivate() {
        let canQuit = true;
        if (this.ifDelete) {
            this.ifDelete = window.confirm('Discard changes?');
            canQuit = this.ifDelete;
        }
        ;
        if (this.ifDelete) {
            this.cancelTournoCreation();
            canQuit = true;
        }
        console.log(canQuit);
        return canQuit;
    }
    ngOnDestroy() {
        if (this.ifDelete) {
            this.cancelTournoCreation();
        }
    }
};
TournoCreationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tourno-creation',
        templateUrl: './tourno-creation.component.html',
        styleUrls: ['./tourno-creation.component.scss'],
        providers: [{
                provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
            }]
    })
], TournoCreationComponent);
export { TournoCreationComponent };
//# sourceMappingURL=tourno-creation.component.js.map