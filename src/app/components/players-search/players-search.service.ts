import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IPlayer } from '../../core/models/IPlayer';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/IUser';

@Injectable({
  providedIn: 'root'
})

export class PlayersSearchService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  user: IUser;
  initialItems: IPlayer[];
  items: IPlayer[];

  countrySubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  myPlayersSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject(false);
  myFavoritesSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject(false);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();

  public searchPlayers(): Observable<IPlayer[]> {

    this.startLoading();

    const result: Observable<IPlayer[]> = this.afs.collection('players').snapshotChanges().pipe(

      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      tap((res: IPlayer[]) => {
        this.initialItems = res;
        this.getCreatorIds();
      }),
      tap(() => this.stopLoading()),
    );

    this.initialItems = this.items;

    return result;
  }

  // subject to refactoring
  public getFilteredItems(): IPlayer[] {

    this.startLoading();

    let name: string;
    let game: string;
    let country: string;
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
    this.countrySubject$.subscribe(val => {
      if (val) {
        country = val;
      }
    });
    this.myPlayersSubject$.subscribe(val => {
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
      .filter((item: IPlayer) => {
        if (name) {
          return item.name.toLowerCase().includes(name);
        } else {
          return item.name;
        }
      })
      .filter((item: IPlayer) => {
        if (game) {
          return item.game === game;
        } else {
          return item.game;
        }
      })
      .filter((item: IPlayer) => {
        if (country) {
          return item.country === country;
        } else {
          return item.country;
        }
      })
      .filter((item: IPlayer) => {
        if (showOnlyMine) {
          return item.userCreatedId === this.authService.getUserLogged.uid;

        } else {
          return item;
        }
      })
      .filter((item: IPlayer) => {
        if (showFavorite) {
          return this.authService.getUserLogged.favoritePlayers.includes(item.id);
        } else {
          return item;
        }
      });

    this.stopLoading();
    return this.items;

  }

  public getCreatorIds(): void {
    if (this.initialItems) {
      this.initialItems.forEach((item: IPlayer) => {
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


  public startLoading(): void {
    this._loading.next(true);
  }

  public stopLoading(): void {
    this._loading.next(false);
  }
}
