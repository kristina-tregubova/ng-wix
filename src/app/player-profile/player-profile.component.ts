import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  players$: Observable<any[]>
  displayedColumns: string[] = ['position', 'name', 'role'];
  dataSource: [];

  constructor(db: AngularFirestore) {
    
      this.players$ = db.collection('players').valueChanges();
      this.players$.subscribe((players: []) => {
        this.dataSource = players;
      })
    
  }

  ngOnInit() {
  }



}
