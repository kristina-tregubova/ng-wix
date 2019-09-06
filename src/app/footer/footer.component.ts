import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { IUser } from '../core/IUser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
