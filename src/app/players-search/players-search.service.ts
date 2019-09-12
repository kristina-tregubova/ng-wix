import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, debounceTime, toArray } from 'rxjs/operators';
import { IPlayer } from '../core/models/IPlayer';

@Injectable({
  providedIn: 'root'
})
export class PlayersSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  initialItems$: BehaviorSubject<any> = new BehaviorSubject(null);
  items$: BehaviorSubject<any> = new BehaviorSubject(null);
  countrySubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();


  searchPlayers() {

    this.startLoading();

    const result = this.afs.collection('players').snapshotChanges().pipe(

      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      tap(() => this.stopLoading()),
    );
    result.subscribe(val => this.initialItems$.next(val));
    this.initialItems$.subscribe(val => this.items$.next(val));
  }

  searchByName() {

    this.startLoading();

    let name;
    this.searchSubject$.subscribe(val => name = val.toLowerCase());

    let resultItemArr;
    this.initialItems$.subscribe((itemArr: IPlayer[]) => {
      const result = itemArr.filter((item: IPlayer) => item.name.toLowerCase().includes(name));
      resultItemArr = result;
    });
    this.items$.next(resultItemArr);
    this.stopLoading();
  }

  filterPlayersByGame() {

    this.startLoading();

    let game;
    this.gameSubject$.subscribe(val => game = val);

    let resultItemArr;
    this.initialItems$.subscribe((itemArr: IPlayer[]) => {
      itemArr = itemArr.filter((item: IPlayer) => {
        if (game) {
          return item.game === game;
        } else {
          return item.game;
        }
      });
      resultItemArr = itemArr;
    });
    this.items$.next(resultItemArr);
    this.stopLoading();
  }

  filterPlayersByCountry() {

    this.startLoading();

    let country;
    this.countrySubject$.subscribe(val => country = val);

    let resultItemArr;
    this.initialItems$.subscribe((itemArr: IPlayer[]) => {
      itemArr = itemArr.filter((item: IPlayer) => {
        if (country) {
          return item.country === country;
        } else {
          return item.country;
        }
      });
      resultItemArr = itemArr;
    });

    this.items$.next(resultItemArr);
    this.stopLoading();
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
