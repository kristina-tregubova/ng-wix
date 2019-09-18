import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tourno-creation',
  templateUrl: './tourno-creation.component.html',
  styleUrls: ['./tourno-creation.component.scss']
})
export class TournoCreationComponent implements OnInit {

  isLinear = false;
  formGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: [''],
          tournamentType: [''],
          country: [''],
          game: [''],
          playerType: [''],
          description: [''],
        }),
        this._formBuilder.group({
          startDate: [''],
          endDate: [''],
          entryFee: [''],
          prize: [''],
        }),
        this._formBuilder.group({

        }),
      ])
    });
  }

}
