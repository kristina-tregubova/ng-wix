import { Component, OnInit, Input } from '@angular/core';
import { TournoCardService } from './tourno-card.service';
import { ITourno } from 'src/app/core/models/ITourno';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tourno-card',
  templateUrl: './tourno-card.component.html',
  styleUrls: ['./tourno-card.component.scss'],
})
export class TournoCardComponent implements OnInit {

  isFavorite: boolean;
  isLogged$: Observable<IUser | null>;

  @Input() item: ITourno;

  constructor(
    private tournoCardService: TournoCardService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;

    if (this.authService.isUserLogged) {
      this.showFavorites();
    }
  }

  private showFavorites(): void {
    this.isFavorite = this.tournoCardService.defineIfFavorite(this.item.id);
  }

  public handleFavorite(): void {
    this.isFavorite
      ? this.tournoCardService.removeFromFavorite(this.item.id)
      : this.tournoCardService.addToFavorite(this.item.id);

    this.isFavorite = !this.isFavorite
  }
}
