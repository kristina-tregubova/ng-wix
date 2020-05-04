import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
import { ITourno } from '../../core/models/ITourno';
import { Observable, of, Subscription } from 'rxjs';
import { IPlayer } from '../../core/models/IPlayer';
import { TournoService } from '../../core/services/tourno.service';
import { TournoProfileService } from './tourno-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../../shared/components/popups/delete-popup/delete-popup.component'
import { IUser } from '../../core/models/IUser';
import { AuthService } from '../../core/services/auth.service';
import { IRound } from '../../core/models/IRound';
import { PlayerService } from '../../core/services/player.service';


@Component({
  selector: 'app-tourno-profile',
  templateUrl: './tourno-profile.component.html',
  styleUrls: ['./tourno-profile.component.scss']
})

export class TournoProfileComponent implements OnInit, OnDestroy {

  isLogged$: Observable<IUser | null>;

  id: string;
  tourno: ITourno;

  backgroundImg: SafeStyle;
  game: string;
  items$: Observable<IPlayer[]>;
  rounds: IRound[];

  ifCreator: boolean | null;
  isBracketEditingDisabled = true;

  isNameEditingDisabled = true;

  isStartDateEditingDisabled = true;
  isEndDateEditingDisabled = true;
  isPrizeEditingDisabled = true;
  isEntryFeeEditingDisabled = true;

  sub: Subscription;

  gameWinner: string;
  gameLoser: string;

  ifFinished = false;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private tournoService: TournoService,
    private tournoProfileService: TournoProfileService,
    private playerService: PlayerService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.sub = this.tournoService.getTourno(this.id)
      .subscribe(async (val: ITourno) => {
        this.tourno = val;
        this.ifCreator = this.authService.getUserLogged ? await this.tournoProfileService.checkIfCreator(this.tourno) : null;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.items$ = this.tournoService.getRelatedPlayers(val);
        this.rounds = val.rounds;
        this.ifFinished = val.status === 'completed';
      });
  }


  public handleEnableBracketEditing(): void {
    this.isBracketEditingDisabled = !this.isBracketEditingDisabled;
  }

  public handleCancelBracketEditing(): void {
    this.isBracketEditingDisabled = true;
  }

  public handleSubmitBracketEditing(): void {
    this.isBracketEditingDisabled = true;
    this.tourno.rounds = this.tournoProfileService.updateRoundsInfo(this.tourno.rounds);
    this.tournoService.updateTournoStatus(this.id, 'in progress');
    this.playerService.updateTournoWinner(this.gameWinner, this.id);
    this.playerService.updateTournoLoser(this.gameLoser, this.id);
    this.tournoService.updateRounds(this.tourno, this.id);
  }

 public handleFinishTournament(): void {
    this.handleSubmitBracketEditing();
    this.tournoService.updateTournoStatus(this.id, 'completed');
    this.ifFinished = true;
  }

  // enum for type --> subject to refactoring
  public handleEnableEditing(type: string): void {
    switch (type) {
      case 'name':
        this.isNameEditingDisabled = !this.isNameEditingDisabled;
        break;
      case 'startDate':
        this.isStartDateEditingDisabled = !this.isStartDateEditingDisabled;
        break;
      case 'endDate':
        this.isEndDateEditingDisabled = !this.isEndDateEditingDisabled;
        break;
      case 'entryFee':
        this.isEntryFeeEditingDisabled = !this.isEntryFeeEditingDisabled;
        break;
      case 'prize':
        this.isPrizeEditingDisabled = !this.isPrizeEditingDisabled;
        break;
    }
  }

  public handleSubmitEditing(type: string): void {
    switch (type) {
      case 'name':
        this.isNameEditingDisabled = true;
        this.tournoService.updateField(this.tourno, this.id, 'name');
        break;
      case 'startDate':
        this.isStartDateEditingDisabled = true;
        this.tournoService.updateField(this.tourno, this.id, 'startDate');
        break;
      case 'endDate':
        this.isEndDateEditingDisabled = true;
        this.tournoService.updateField(this.tourno, this.id, 'endDate');
        break;
      case 'entryFee':
        this.isEntryFeeEditingDisabled = true;
        this.tournoService.updateField(this.tourno, this.id, 'entryFee');
        break;
      case 'prize':
        this.isPrizeEditingDisabled = true;
        this.tournoService.updateField(this.tourno, this.id, 'prize');
        break;
    }
  }


  public handleOpenDeletePopup(): void {
    this.dialog.open(DeletePopupComponent, {
      width: '450px',
      data: {
        collectionName: 'tournaments',
        itemId: this.id
      }
    });
  }

  // subject to refactoring --> create interface
  public setWinner(value: {winner: string, loser: string}): void {
    this.gameWinner = value.winner;
    this.gameLoser = value.loser;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
