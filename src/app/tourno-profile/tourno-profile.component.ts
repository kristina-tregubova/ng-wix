import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ITourno } from '../core/models/ITourno';
import { Observable, of } from 'rxjs';
import { IPlayer } from '../core/models/IPlayer';
import { TournoService } from '../shared/tourno.service';
import { TournoProfileService } from './tourno-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../shared/delete-popup/delete-popup.component'
import { IUser } from '../core/models/IUser';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-tourno-profile',
  templateUrl: './tourno-profile.component.html',
  styleUrls: ['./tourno-profile.component.scss']
})
export class TournoProfileComponent implements OnInit {
  user: IUser | null
  isLogged$: Observable<IUser | null>;

  id: string;
  tourno: ITourno;

  backgroundImg: any;
  game: string;
  items$: Observable<IPlayer[]>;
  rounds: [];

  ifCreator: boolean | null;
  isBracketEditingDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private tournoService: TournoService,
    private tournoProfileService: TournoProfileService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user = this.authService.getUserLogged;
    this.isLogged$ = this.authService.userLoggedSubject$;

    this.tournoService.getTourno(this.id)
      .subscribe(async (val: ITourno) => {
        this.tourno = val;
        this.ifCreator = this.user ? await this.tournoProfileService.checkIfCreator(this.tourno) : null;
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
    this.tournoService.updateRounds(this.tourno, this.id);
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
