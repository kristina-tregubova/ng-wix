import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  private _id: string;
  player: object;
  backgroundImg: any;
  game: string;

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
      .subscribe((val: object) => {
        this.player = val;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/games-wp/${val.game}.jpg)`);
      });
  }

}
