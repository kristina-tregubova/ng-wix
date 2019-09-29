import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TournoCreationService } from './tourno-creation.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-tourno-creation',
  templateUrl: './tourno-creation.component.html',
  styleUrls: ['./tourno-creation.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class TournoCreationComponent implements OnInit {

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
    
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
          tournamentType: [''],
          country: ['', Validators.required],
          game: ['', Validators.required],
          playerType: [''],
          description: [''],
        }),
        this.formBuilder.group({
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          entryFee: [''],
          prize: [''],
        }),
        this.formBuilder.group({
          relatedPlayers: ['', Validators.required]
        }),
      ])
    });

    this.formGroup.patchValue(this.ref);
  }

  async createNewTournoDoc() {
    this.ref = await this.tournoCreationService.createDefaultTourno();
  }

  saveFormChanges() {
    const data = this.formGroup.value;
    this.tournoCreationService.updateDefaultTourno(this.ref, data);
  }

  saveTournament() {
    if (this.formGroup.status != 'VALID') {
      console.log('form is not valid, cannot save data');
      return;
    }

    this.saveFormChanges();

    // some tourno/rounds building methods
    // get tourno id
    // navigate to tourno profile with id
  }

  createTournoRounds() {

    // some logic here
  }

  cancelTournoCreation() {
    // delete created tourno by ref in db
  }

}
