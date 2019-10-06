import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ITourno } from '../../core/models/ITourno';
import { IPlayer } from '../../core/models/IPlayer';
import { PlayerService } from '../../shared/services/player.service';
import { PlayerProfileService } from './player-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../../shared/popups/delete-popup/delete-popup.component'
import { AuthService } from '../../core/auth.service';
import { IUser } from '../../core/models/IUser';
import { Observable, Subscription } from 'rxjs';
import { FileUploadPopupComponent } from '../../shared/popups/file-upload-popup/file-upload-popup.component';


@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss'],
})
export class PlayerProfileComponent implements OnInit, OnDestroy {

  isLogged$: Observable<IUser | null>;

  id: string;

  player: IPlayer;
  backgroundImg: any;
  logoUrl: any;
  game: string;

  items: ITourno[];

  dataSource: any[] | null;
  displayedColumns = ['name', 'role'];

  ifCreator: boolean | null;
  isNameEditingDisabled = true;
  isTeamEditingDisabled = true;

  sub: Subscription;

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
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.sub = this.playerService.getPlayer(this.id)
      .subscribe(async (val: IPlayer) => {
        this.player = val;
        this.ifCreator = this.authService.getUserLogged ? await this.playerProfileService.checkIfCreator(this.player) : null;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.dataSource = val.team;
        this.items = this.playerService.getTournamentsAttended(val);
        // this.playerService.updatePlayerInfo(val);
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
        itemId: this.id
      }
    });
  }

  handleOpenFileUploadPopup() {
    console.log(this.id)
    this.dialog.open(FileUploadPopupComponent, {
      width: '450px',
      data: {
        storageName: 'players-logos/',
        Id: this.id
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
