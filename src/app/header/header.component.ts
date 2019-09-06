import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../core/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IUser;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  async tryLogout() {
    await this.authService.logout();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

  }

}
