import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITourno } from '../models/ITourno';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';
import { IPlayer } from '../models/IPlayer';


@Injectable({
  providedIn: 'root'
})

export class TournoService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  // ??
  public getTourno(id: string): Observable<any> {
    return this.afs.collection('tournaments').doc(id).valueChanges();
  }

  // subject to refactoring --> check arg type, causes errors
  public getRelatedPlayers(tourno): Observable<IPlayer[]> {
    let items: IPlayer[];

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

  public updateField(tourno: ITourno, tournoId: string, field: string): void {
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

  public updateTournoStatus(tournoId: string, status: string): void {

    this.afs.collection('tournaments').doc(tournoId).update({
      status: status
    }).then(() => {
      console.log('Status successfully updated!');
    }).catch((error) => {
      console.error('Error updating status: ', error);
    });
  }

  public updateRounds(tourno: ITourno, id?: string): void {

    this.afs.collection('tournaments').doc(id).update({
      rounds: tourno.rounds
    }).then(() => {
      this.snackBar.open('Points were successfully updated! 👍', '', {
        duration: 3000
      });
      console.log('Document successfully updated!');
    }).catch((error) => {
      this.snackBar.open('Error occured while save game results. Try again later 👻', '', {
        duration: 3000
      });
      console.error('Error updating document: ', error);
    });
  }


  public deleteTourno(tournoId: string): void {
    this.afs.collection('tournaments').doc(tournoId).delete().then(() => {
      this.snackBar.open('Tournament was successfully deleted! 👍', '', {
        duration: 3000
      });
      console.log('Document successfully deleted!');
    }).catch((error) => {
      this.snackBar.open('Error occured while deleting this tournament. Try again later 👻', '', {
        duration: 3000
      });
      console.error('Error removing document: ', error);
    });
  }

}
