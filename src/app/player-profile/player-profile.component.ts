import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ITourno } from '../core/models/ITourno';
import { IPlayer } from '../core/models/IPlayer';
import { PlayerService } from '../shared/player.service';
import { PlayerProfileService } from './player-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../shared/delete-popup/delete-popup.component'
import { AuthService } from '../core/auth.service';
import { IUser } from '../core/models/IUser';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {
  user: IUser | null
  isLogged$: Observable<IUser | null>;

  id: string;

  player: any;
  backgroundImg: any;
  game: string;

  items: ITourno[];

  dataSource: [] | null;
  displayedColumns = ['name', 'role'];

  ifCreator: boolean | null;
  isNameEditingDisabled = true;
  isTeamEditingDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private playerService: PlayerService,
    private playerProfileService: PlayerProfileService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user = this.authService.getUserLogged;
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.playerService.getPlayer(this.id)
      .subscribe(async (val: IPlayer) => {
        this.player = val;
        this.ifCreator = this.user ? await this.playerProfileService.checkIfCreator(this.player) : null;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.dataSource = val.team;
        this.items = this.playerService.getTournamentsAttended(val);
      });
  }

  handleEnableEditing(type) {
    switch (type) {
      case 'name':
        this.isNameEditingDisabled = !this.isNameEditingDisabled;
        break;
      case 'team':
        this.isTeamEditingDisabled = !this.isTeamEditingDisabled;
        break;
    }
  }

  handleSubmitEditing(type) {
    switch (type) {
      case 'name':
        this.isNameEditingDisabled = true;
        this.playerService.updateField(this.player, this.id, 'name');
        break;
      case 'team':
        this.isTeamEditingDisabled = true;
        this.playerService.updateField(this.player, this.id, 'team');
        break;
    }
  }

  handleAddTeamMember() {
    this.playerService.addTeamMember(this.player, this.id);
  }

  handleOpenDeletePopup() {
    this.dialog.open(DeletePopupComponent, {
      width: '450px',
      data: {
        collectionName: 'players',
        item: this.id
      }
    });
  }

}
