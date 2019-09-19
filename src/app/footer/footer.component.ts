import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { IUser } from '../core/models/IUser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  user: IUser;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

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
