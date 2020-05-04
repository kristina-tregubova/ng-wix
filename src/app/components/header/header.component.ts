import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../core/models/IUser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged$: Observable<IUser | null>

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;
  }

  async tryLogout() {
    await this.authService.logout();
  }


}
