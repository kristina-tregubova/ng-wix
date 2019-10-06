import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TournoCreationService } from './tourno-creation.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tourno-creation',
  templateUrl: './tourno-creation.component.html',
  styleUrls: ['./tourno-creation.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class TournoCreationComponent implements OnInit, OnDestroy {
  // CanComponentDeactivate

  ref: DocumentReference;

  isLinear = true;
  formGroup: FormGroup;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  ifRandom: boolean;
  ifDelete: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private tournoCreationService: TournoCreationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

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

  async handleSeedPlayers(ifRandom) {
    return await this.tournoCreationService.seedPlayers(ifRandom, this.ref)
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
Ï

  async checkBeforeSaveTournament(numberRef, ifRandom) {

    if (this.formGroup.status != 'VALID') {
      console.log('form is not valid, cannot save data');
      return;
    }

    let participantsNumber = await this.formGroup.get('formArray').get([2]).get('participants').value;
    let chosenPlayers = await this.handleSeedPlayers(ifRandom);


    if (+participantsNumber === +chosenPlayers.length) {
      this.saveTournament(numberRef, participantsNumber, chosenPlayers);
    } else {
      this.snackBar.open('Chosen number players and participants number do not correspond. Add or remove some 🏃', '', {
        duration: 3000
      });
    }

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
        console.error(error)
      });

    this.router.navigate(['/tourno-profile/' + this.ref.id])
  }

  cancelTournoCreation() {
    this.tournoCreationService.deleteTourno(this.ref);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {

    let canQuit = true;

    if (this.ifDelete) {
      this.ifDelete = window.confirm('Discard changes?')
      canQuit = this.ifDelete;
    };

    if (this.ifDelete) {
      this.cancelTournoCreation();
      canQuit = true;
    }

    console.log(canQuit)

    return canQuit;
  }

  ngOnDestroy() {
    if (this.ifDelete) {
      this.cancelTournoCreation();
    }
  }

}
