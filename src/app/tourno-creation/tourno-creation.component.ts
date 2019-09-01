import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-tourno-creation',
  templateUrl: './tourno-creation.component.html',
  styleUrls: ['./tourno-creation.component.scss']
})
export class TournoCreationComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor() { }

  ngOnInit() {
  }

}
