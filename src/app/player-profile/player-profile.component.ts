import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  private _id: string;
  player: object;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
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
      });
  }

}
