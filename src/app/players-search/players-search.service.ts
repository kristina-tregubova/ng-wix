import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, debounceTime } from 'rxjs/operators';
import { IPlayer } from '../core/models/IPlayer';

@Injectable({
  providedIn: 'root'
})
export class PlayersSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  items$: Observable<any[]>;
  countrySubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();


  searchPlayers() {

    this.startLoading();

    this.items$ = this.afs.collection('players').snapshotChanges().pipe(

      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      tap(() => this.stopLoading()),
    )
    return this.items$;
  }

  searchByName() {

    this.startLoading();

    let name;
    this.searchSubject$.subscribe(val => name = val.toLowerCase());

    this.items$ = this.items$.pipe(


      map((itemArr: IPlayer[]) => {
        return itemArr = itemArr.filter((item: IPlayer) => item.name.toLowerCase().includes(name));
      }),
      tap(() => this.stopLoading()),
    )

    return this.items$;

  }
  filterPlayersByGame() {

    this.startLoading();

    let game;
    this.gameSubject$.subscribe(val => game = val);

    this.items$ = this.items$.pipe(

      map((itemArr: IPlayer[]) => {
        return itemArr = itemArr.filter((item: IPlayer) => item.game === game);
      }),
      tap(() => this.stopLoading()),
    )

    return this.items$;
  }

  filterPlayersByCountry() {

    this.startLoading();

    let country;
    this.countrySubject$.subscribe(val => country = val);

    this.items$ = this.items$.pipe(

      map((itemArr: IPlayer[]) => {
        return itemArr = itemArr.filter((item: IPlayer) => item.country === country);
      }),
      tap(() => this.stopLoading()),
    )

    return this.items$;
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
