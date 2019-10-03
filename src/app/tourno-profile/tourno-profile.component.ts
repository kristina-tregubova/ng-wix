import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ITourno } from '../core/models/ITourno';
import { Observable, of } from 'rxjs';
import { IPlayer } from '../core/models/IPlayer';
import { TournoService } from '../shared/tourno.service';
import { TournoProfileService } from './tourno-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../shared/popups/delete-popup/delete-popup.component'
import { IUser } from '../core/models/IUser';
import { AuthService } from '../core/auth.service';
import { IRound } from '../core/models/IRound';


@Component({
  selector: 'app-tourno-profile',
  templateUrl: './tourno-profile.component.html',
  styleUrls: ['./tourno-profile.component.scss']
})
export class TournoProfileComponent implements OnInit {

  isLogged$: Observable<IUser | null>;

  id: string;
  tourno: ITourno;

  backgroundImg: any;
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


  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private tournoService: TournoService,
    private tournoProfileService: TournoProfileService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.tournoService.getTourno(this.id)
      .subscribe(async (val: ITourno) => {
        this.tourno = val;
        this.ifCreator = this.authService.getUserLogged ? await this.tournoProfileService.checkIfCreator(this.tourno) : null;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.items$ = this.tournoService.getRelatedPlayers(val);
        this.rounds = val.rounds;
      });
  }


  handleEnableBracketEditing() {
    this.isBracketEditingDisabled = !this.isBracketEditingDisabled;
  }

  handleCancelBracketEditing() {
    this.isBracketEditingDisabled = true;
  }

  handleSubmitBracketEditing() {
    this.isBracketEditingDisabled = true;
    this.tourno.rounds = this.tournoProfileService.updateRoundsInfo(this.tourno.rounds);
    this.tournoService.updateRounds(this.tourno, this.id);
  }

  handleEnableEditing(type) {
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

  handleSubmitEditing(type) {
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


  handleOpenDeletePopup() {
    this.dialog.open(DeletePopupComponent, {
      width: '450px',
      data: {
        collectionName: 'tournaments',
        itemId: this.id
      }
    });
  }
}
