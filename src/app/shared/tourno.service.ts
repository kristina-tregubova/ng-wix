import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITourno } from '../core/models/ITourno';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TournoService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getTourno(id: string) {
    return this.afs.collection('tournaments').doc(id).valueChanges();
  }

  getRelatedPlayers(tourno) {
    const items = [];

    for (const player of tourno.relatedPlayers) {
      player.get().then((doc) => {
        if (doc.exists) {
           items.push(doc.data());
        }
      });
    }

    return of(items);
  }
}
