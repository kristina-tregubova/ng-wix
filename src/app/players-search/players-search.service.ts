import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  items$: Observable<any>;
  countrySubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  startAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  endAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);


  searchPlayers() {
    this.items$ = combineLatest(
      this.countrySubject$,
      this.gameSubject$,
      this.startAtSubject$,
      this.endAtSubject$,
    ).pipe(
      switchMap(([country, game, start, end]) =>

        this.afs.collection('players', ref => {
          console.log(country, game, start, end);
          let query: firebase.firestore.Query = ref;
          if (country) { query = query.where('country', '==', country) };
          if (game) { query = query.where('game', '==', game) };
          if (start || end) {
            query = query.orderBy("name").startAt(start).endAt(end)
          };
          return query;

        }).valueChanges()
      )
    )
    return this.items$;
  }
}
