import { Injectable, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { ITourno } from '../core/models/ITourno';

@Injectable({
  providedIn: 'root'
})
export class TournosSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  private _items$: Observable<any[]>;
  statusSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();


  searchTournaments() {

    this.startLoading();

    this._items$ = this.afs.collection('tournaments').snapshotChanges().pipe(
      tap(() => this.stopLoading()),
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      tap(() => this.stopLoading()),
    )
    return this._items$;
  }

  sortTournamentsByGame() {
    let game = this.gameSubject$.subscribe(val => val);
    this._items$.pipe(
      filter((item) => item.game === game))
    )
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
