import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ITourno } from '../core/models/ITourno';
import { IPlayer } from '../core/models/IPlayer';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  private _id: string;

  player: any;
  backgroundImg: any;
  game: string;
  points: number;
  games: number;
  wins: number;

  items$: Observable<ITourno[]>;

  dataSource: [] | null;
  displayedColumns = ['name', 'role'];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private playerService: PlayerService
  ) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(this._id)
      .subscribe((val: IPlayer) => {
        this.player = val;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.points = this.playerService.getPlayerPoints(val);
        this.games = this.playerService.getPlayerGames(val);
        this.wins = this.playerService.getPlayerWins(val);
        this.dataSource = val.team;
        this.items$ = this.playerService.getTournamentsAttended(val);
      });
  }
}
