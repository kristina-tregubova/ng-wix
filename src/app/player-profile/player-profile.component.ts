import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ITourno } from '../core/models/ITourno';
import { IPlayer } from '../core/models/IPlayer';

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
  items$: Observable<ITourno[]>;

  dataSource: [] | null;
  displayedColumns = ['name', 'role'];

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.getPlayer();
  }

  getPlayer() {
    this.afs.collection('players').doc(this._id).valueChanges()
      .subscribe((val: IPlayer) => {
        this.player = val;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
        this.dataSource = val.team;
        this.items$ = this.getTournamentsAttended(val);
      });
  }

  getTournamentsAttended(player): Observable<ITourno[]> {
    const items: Array<ITourno> = [];

    for (const tourno of player.relatedTournaments) {
      tourno.tournament.get().then((doc) => {
        if (doc.exists) {
           items.push(doc.data());
        }
      });
    }
    return of(items);
  }
}
