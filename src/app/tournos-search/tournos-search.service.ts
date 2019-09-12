import { Injectable, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, filter, last, debounceTime } from 'rxjs/operators';
import { ITourno } from '../core/models/ITourno';

@Injectable({
  providedIn: 'root'
})
export class TournosSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  items$: Observable<any[]>;
  statusSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();


  searchTournaments() {

    this.startLoading();

    this.items$ = this.afs.collection('tournaments').snapshotChanges().pipe(

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


      map((itemArr: ITourno[]) => {
        return itemArr = itemArr.filter((item: ITourno) => item.name.toLowerCase().includes(name));
      }),
      tap(() => this.stopLoading()),
    )

    return this.items$;

  }

  filterTournamentsByGame() {

    this.startLoading();

    let game;
    this.gameSubject$.subscribe(val => game = val);

    this.items$ = this.items$.pipe(

      map((itemArr: ITourno[]) => {
        return itemArr = itemArr.filter((item: ITourno) => {
          if (game) {
            return item.game === game;
          } else {
            return item.game;
          }
        });
      }),
      tap(() => this.stopLoading()),
    )

    return this.items$;
  }

  filterTournamentsByStatus() {

    this.startLoading();

    let status;
    this.statusSubject$.subscribe(val => status = val);

    this.items$ = this.items$.pipe(

      map((itemArr: ITourno[]) => {
        return itemArr = itemArr.filter((item: ITourno) => {
          if (status) {
            return item.game === status;
          } else {
            return item.game;
          }
        });
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
