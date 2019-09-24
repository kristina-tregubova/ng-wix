import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ITourno } from '../core/models/ITourno';
import { Observable, of } from 'rxjs';
import { IPlayer } from '../core/models/IPlayer';
import { TournoService } from '../shared/tourno.service';


@Component({
  selector: 'app-tourno-profile',
  templateUrl: './tourno-profile.component.html',
  styleUrls: ['./tourno-profile.component.scss']
})
export class TournoProfileComponent implements OnInit {

  private _id: string;
  tourno: ITourno;
  backgroundImg: any;
  game: string;
  items$: Observable<IPlayer[]>;
  rounds: [];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private tournoService: TournoService,
  ) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.tournoService.getTourno(this._id)
      .subscribe((val: ITourno) => {
        this.tourno = val;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.items$ = this.tournoService.getRelatedPlayers(val);
        this.rounds = val.rounds;
      });
  }
}
