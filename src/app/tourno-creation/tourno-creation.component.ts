import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-tourno-creation',
  templateUrl: './tourno-creation.component.html',
  styleUrls: ['./tourno-creation.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class TournoCreationComponent implements OnInit {

  isLinear = true;
  formGroup: FormGroup;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: ['', Validators.required],
          tournamentType: [''],
          country: ['', Validators.required],
          game: ['', Validators.required],
          playerType: [''],
          description: [''],
        }),
        this._formBuilder.group({
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          entryFee: [''],
          prize: [''],
        }),
        this._formBuilder.group({

        }),
      ])
    });
  }

}
