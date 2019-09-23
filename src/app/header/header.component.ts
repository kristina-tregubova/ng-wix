import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../core/models/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IUser | null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async tryLogout() {
    await this.authService.logout();
  }

  getUser() {
    this.authService.userLoggedSubject$.subscribe((u) => {
      this.user = u;
    });
  }



}
