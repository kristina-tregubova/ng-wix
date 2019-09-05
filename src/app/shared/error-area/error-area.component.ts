import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-error-area',
  templateUrl: './error-area.component.html',
  styleUrls: ['./error-area.component.scss']
})
export class ErrorAreaComponent implements OnInit {

  errorMessage: string;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.errorMessage.subscribe((errorMessage) =>  {
      this.errorMessage = errorMessage;
    });
  }
}
