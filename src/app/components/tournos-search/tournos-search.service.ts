import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ITourno } from '../../core/models/ITourno';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class TournosSearchService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  user: IUser;
  initialItems: ITourno[];
  items: ITourno[];

  statusSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  myTournamentsSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject(false);
  myFavoritesSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject(false);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();


  public searchTournaments(): Observable<ITourno[]> {

    this.startLoading();

    const result = this.afs.collection('tournaments').snapshotChanges().pipe(

      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      tap((res: ITourno[]) => {
        this.initialItems = res;
        this.getCreatorIds();
      }),
      tap(() => this.stopLoading()),
    )
    this.initialItems = this.items;

    return result;

  }

  // subject to refactoring
  public getFilteredItems(): ITourno[] {

    this.startLoading();

    let name: string;
    let game: string;
    let status: string;
    let showOnlyMine: boolean;
    let showFavorite: boolean;

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
    this.myFavoritesSubject$.subscribe(val => {
      if (val) {
        showFavorite = val;
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

          return item.userCreatedId === this.authService.getUserLogged.uid;

        } else {
          return item;
        }
      })
      .filter((item: ITourno) => {
        if (showFavorite) {
          return this.authService.getUserLogged.favoriteTournos.includes(item.id);
        } else {
          return item;
        }
      });

    this.stopLoading();
    return this.items;

  }

  public getCreatorIds(): void {
    if (this.initialItems) {
      this.initialItems.forEach((item: ITourno) => {
        if (item.userCreated) {
          item.userCreated.get()
            .then((doc) => {
              if (doc.exists) {
                item['userCreatedId'] = doc.id;
              }
            });
        }
      });
    }
  }

  private startLoading(): void {
    this._loading.next(true);
  }

  private stopLoading(): void {
    this._loading.next(false);
  }
}
