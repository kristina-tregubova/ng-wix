import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tourno-profile',
  templateUrl: './tourno-profile.component.html',
  styleUrls: ['./tourno-profile.component.scss']
})
export class TournoProfileComponent implements OnInit {

  private _id: string;
  tourno: object;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.getTourno();
  }

  getTourno() {
    this.afs.collection('tournaments').doc(this._id).valueChanges()
      .subscribe((val: object) => {
        this.tourno = val;
      });
  }

}
