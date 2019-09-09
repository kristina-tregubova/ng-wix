import { Injectable, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournosSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }



  statusSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  startAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  endAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();


  searchTournaments() {

    this.startLoading();

    return combineLatest(
      this.statusSubject$,
      this.gameSubject$,
      this.startAtSubject$,
      this.endAtSubject$,
    ).pipe(
      tap(() => this.startLoading()),
      switchMap(([status, game, start, end]) =>

        this.afs.collection('tournaments', ref => {

          let query: firebase.firestore.Query = ref;
          if (status) { query = query.where('status', '==', status); }
          if (game) { query = query.where('game', '==', game); }
          if (start || end) {
            query = query.orderBy("name").startAt(start).endAt(end);
          }

          return query;

        }).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
          });
        }))
      ),
      tap(() => this.stopLoading()),
    );
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
