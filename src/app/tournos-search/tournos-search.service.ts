import { Injectable, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, filter, last, debounceTime } from 'rxjs/operators';
import { ITourno } from '../core/models/ITourno';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TournosSearchService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  userId: string;
  initialItems: any[];
  items: ITourno[];

  statusSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  myTournamentsSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject(false);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();

  getUserId() {
    this.authService.user$.subscribe((u) => {
      this.userId = u.uid;
    });
    return this.userId;
  }

  searchTournaments() {

    this.startLoading();

    const result = this.afs.collection('tournaments').snapshotChanges().pipe(

      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      tap(() => this.getCreatorIds()),
      tap(() => this.stopLoading()),
    )
    result.subscribe((val) => this.initialItems = val);
    this.initialItems = this.items;

    return result;

  }

  getFilteredItems() {

    this.startLoading();

    let name: string;
    let game: string;
    let status: string;
    let showOnlyMine: boolean;

    this.searchSubject$.subscribe(val => {
      if (val) {
        name = val.toLowerCase();
      }
    });
    this.gameSubject$.subscribe(val => {
      if (val) {
        game = val;
      }
    });
    this.statusSubject$.subscribe(val => {
      if (val) {
        status = val;
      }
    });
    this.myTournamentsSubject$.subscribe(val => {
      if (val) {
        showOnlyMine = val;
      }
    });

    this.items = this.initialItems
      .filter((item: ITourno) => {
        if (name) {
          return item.name.toLowerCase().includes(name);
        } else {
          return item.name;
        }
      })
      .filter((item: ITourno) => {
        if (game) {
          return item.game === game;
        } else {
          return item.game;
        }
      })
      .filter((item: ITourno) => {
        if (status) {
          return item.status === status;
        } else {
          return item.status;
        }
      })
      .filter((item: ITourno) => {
        if (showOnlyMine) {

          return item.userCreatedId === this.userId;

        } else {
          return item;
        }
      });

    this.stopLoading();
    return this.items;

  }

  async getCreatorIds() {
    await this.initialItems.forEach((item: ITourno) => {
      item.userCreated.get()
        .then((doc) => {
          if (doc.exists) {
            item['userCreatedId'] = doc.id;
            console.log(doc.id)
          }
        });
    })
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
