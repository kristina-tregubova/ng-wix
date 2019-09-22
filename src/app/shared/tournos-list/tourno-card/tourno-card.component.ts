import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { TournoCardService } from './tourno-card.service';
import { ITourno } from 'src/app/core/models/ITourno';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-tourno-card',
  templateUrl: './tourno-card.component.html',
  styleUrls: ['./tourno-card.component.scss']
})
export class TournoCardComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() item: ITourno;
  isFavorite: boolean;
  isLogged$: Observable<IUser | null>;

  constructor(
    private tournoCardService: TournoCardService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    let user = this.tournoCardService.getUser();
    this.isLogged$ = this.authService.userLoggedSubject$;
  }

  ngAfterViewInit() {
    this.showFavorites();
  }
  
  showFavorites() {
    this.isFavorite = this.tournoCardService.defineIfFavorite(this.item.id) ? true : false;
  }

  handleFavorite() {
    if (this.isFavorite) {
      this.isFavorite = false;
      this.tournoCardService.removeFromFavorite(this.item.id);
    } else {
      this.isFavorite = true;
      this.tournoCardService.addToFavorite(this.item.id);
    }
    console.log(this.isFavorite);
  }

  ngOnDestroy() {

  }


}
