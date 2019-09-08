import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  
  countrySubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  startAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  endAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();


  searchPlayers() {

    this.startLoading();

    return combineLatest(
      this.countrySubject$,
      this.gameSubject$,
      this.startAtSubject$,
      this.endAtSubject$,
    ).pipe(
      tap(() => this.startLoading()),
      switchMap(([country, game, start, end]) =>

        this.afs.collection('players', ref => {

          let query: firebase.firestore.Query = ref;
          if (country) { query = query.where('country', '==', country) };
          if (game) { query = query.where('game', '==', game) };
          if (start || end) {
            query = query.orderBy("name").startAt(start).endAt(end)
          };
          
          return query;

        }).valueChanges()
      ),
      tap(() => this.stopLoading()),
    )
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
