import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ITourno } from '../core/models/ITourno';
import { Observable, of } from 'rxjs';
import { IPlayer } from '../core/models/IPlayer';
import { TournoService } from '../shared/tourno.service';
import { TournoProfileService } from './tourno-profile.service';


@Component({
  selector: 'app-tourno-profile',
  templateUrl: './tourno-profile.component.html',
  styleUrls: ['./tourno-profile.component.scss']
})
export class TournoProfileComponent implements OnInit {
  isLogged: boolean;

  private _id: string;
  tourno: ITourno;

  backgroundImg: any;
  game: string;
  items$: Observable<IPlayer[]>;
  rounds: [];

  ifCreator: boolean | null;
  isEditingDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private tournoService: TournoService,
    private tournoProfileService: TournoProfileService
  ) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.isLogged = this.tournoProfileService.getUser() ? true : false;

    this.tournoService.getTourno(this._id)
      .subscribe(async (val: ITourno) => {
        this.tourno = val;
        this.ifCreator = this.isLogged ? await this.tournoProfileService.checkIfCreator(this.tourno) : null;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.items$ = this.tournoService.getRelatedPlayers(val);
        this.rounds = val.rounds;
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
