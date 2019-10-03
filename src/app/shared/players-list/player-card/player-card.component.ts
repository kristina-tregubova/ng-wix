import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../player.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser';
import { PlayerCardService } from './player-card.service';
import { AuthService } from 'src/app/core/auth.service';
import { IPlayer } from 'src/app/core/models/IPlayer';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  @Input() item: IPlayer;
  @Input() showBtns: boolean = true;
  
  games: number;
  wins: number;

  isFavorite: boolean;
  isLogged$: Observable<IUser | null>;

  constructor(
    private playerService: PlayerService,
    private playerCardService: PlayerCardService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged$ = this.authService.userLoggedSubject$;
    
    if (this.authService.isUserLogged) {
      this.showFavorites();
    }

    this.playerService.updatePlayerInfo(this.item);
  }

  showFavorites() {
    this.isFavorite = this.playerCardService.defineIfFavorite(this.item.id) ? true : false;
  }

  handleFavorite() {
    if (this.isFavorite) {
      this.isFavorite = false;
      this.playerCardService.removeFromFavorite(this.item.id);
    } else {
      this.isFavorite = true;
      this.playerCardService.addToFavorite(this.item.id);
    }
  }

  ngOnDestroy() {

  }

}
