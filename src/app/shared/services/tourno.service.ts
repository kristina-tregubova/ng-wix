import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITourno } from '../../core/models/ITourno';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TournoService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  getTourno(id: string) {
    return this.afs.collection('tournaments').doc(id).valueChanges();
  }

  getRelatedPlayers(tourno) {
    let items;

    if (tourno.relatedPlayers) {
      items = [];

      for (const player of tourno.relatedPlayers) {
        player.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const id = doc.id;
            items.push({ id, ...data });
          }
        });
      }
      return of(items);
    }
  }

  updateField(tourno: ITourno, tournoId: string, field: string) {
    const updateInfo = {};
    updateInfo['' + field] = tourno[field];

    this.afs.collection('tournaments').doc(tournoId).update(
      updateInfo
    ).then(() => {
      console.log('Document successfully updated!');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }

  updateTournoStatus(tournoId: string, status: string) {

    this.afs.collection('tournaments').doc(tournoId).update({
      status: status
    }).then(() => {
      console.log('Status successfully updated!');
    }).catch((error) => {
      console.error('Error updating status: ', error);
    });
  }

  updateRounds(tourno: ITourno, id?: string) {

    this.afs.collection('tournaments').doc(id).update({
      rounds: tourno.rounds
    }).then(() => {
      console.log('Document successfully updated!');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }


  deleteTourno(tournoId) {
    this.afs.collection('tournaments').doc(tournoId).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

}
