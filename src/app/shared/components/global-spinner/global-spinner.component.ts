import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
  styleUrls: ['./global-spinner.component.scss']
})
export class GlobalSpinnerComponent implements OnInit {

  visible = true;

  constructor() { }

  ngOnInit() {
    setTimeout(() => (this.visible = false), 3000);
  }

}
