import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TournoCreationService } from './tourno-creation.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../core/deactivate-guard.service';

@Component({
  selector: 'app-tourno-creation',
  templateUrl: './tourno-creation.component.html',
  styleUrls: ['./tourno-creation.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class TournoCreationComponent implements OnInit, CanComponentDeactivate {

  ref: DocumentReference;

  isLinear = true;
  formGroup: FormGroup;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(
    private formBuilder: FormBuilder,
    private tournoCreationService: TournoCreationService,
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
          tournamentType: [''],
          country: ['', Validators.required],
          game: ['', Validators.required],
          playerType: [''],
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

  saveFormChanges(numberRef) {
    const data = this.formGroup.get('formArray').get([numberRef]).value;
    data['id'] = this.ref.id;
    
    this.tournoCreationService.updateDefaultTourno(this.ref, data);
  }

  saveTournament(numberRef) {
    if (this.formGroup.status != 'VALID') {
      console.log('form is not valid, cannot save data');
      return;
    }

    this.saveFormChanges(numberRef);

    // some tourno/rounds building methods
    // get tourno id
    // navigate to tourno profile with id
  }

  createTournoRounds() {

    // some logic here
  }

  cancelTournoCreation() {
    this.ref.delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return window.confirm('Discard changes?');
  }

}
