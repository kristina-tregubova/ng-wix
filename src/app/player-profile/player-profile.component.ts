import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ITourno } from '../core/models/ITourno';
import { IPlayer } from '../core/models/IPlayer';
import { PlayerService } from '../shared/player.service';
import { PlayerProfileService } from './player-profile.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {
  isLogged: boolean;

  private _id: string;

  player: any;
  backgroundImg: any;
  game: string;

  items: ITourno[];

  dataSource: [] | null;
  displayedColumns = ['name', 'role'];

  ifCreator: boolean | null;
  isEditingDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private playerService: PlayerService,
    private playerProfileService: PlayerProfileService,
  ) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.isLogged = this.playerProfileService.getUser() ? true : false;

    this.playerService.getPlayer(this._id)
      .subscribe(async (val: IPlayer) => {
        this.player = val;
        this.ifCreator = this.isLogged ? await this.playerProfileService.checkIfCreator(this.player) : null;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.dataSource = val.team;
        this.items = this.playerService.getTournamentsAttended(val);
      });
  }

  handleEnableEditing() {
    this.isEditingDisabled = !this.isEditingDisabled;
  }

  handleCancelEditing() {
    this.isEditingDisabled = true;
  }

  handleSubmitEditing() {
    this.isEditingDisabled = true;
  }

}
