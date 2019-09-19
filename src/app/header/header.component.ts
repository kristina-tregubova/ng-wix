import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
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
    private router: Router,
  ) { }

  async tryLogout() {
    await this.authService.logout();
  }

  getUser() {
    this.authService.user$.subscribe((u) => {
      this.user = u;
    });
  }

  ngOnInit() {
    this.getUser();
  }

}
