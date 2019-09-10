import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ITourno } from '../core/models/ITourno';
import { Observable, of } from 'rxjs';
import { IPlayer } from '../core/models/IPlayer';

@Component({
  selector: 'app-tourno-profile',
  templateUrl: './tourno-profile.component.html',
  styleUrls: ['./tourno-profile.component.scss']
})
export class TournoProfileComponent implements OnInit {

  private _id: string;
  tourno: any;
  backgroundImg: any;
  game: string;
  items$: Observable<IPlayer[]>;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.getTourno();
  }

  getTourno() {
    this.afs.collection('tournaments').doc(this._id).valueChanges()
      .subscribe((val: ITourno) => {
        this.tourno = val;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
      });
  }

  getRelatedPlayers(val) {
    const items = [];

    for (const player of val.relatedPlayers) {
      player.get().then((doc) => {
        if (doc.exists) {
           items.push(doc.data());
        }
      });
    }

    this.items$ = of(items);
  }

}
