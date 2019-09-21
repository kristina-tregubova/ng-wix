import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, tap, map, debounceTime, toArray, take, last, first } from 'rxjs/operators';
import { IPlayer } from '../core/models/IPlayer';
import { delay } from 'q';
import { AuthService } from '../core/auth.service';
import { IUser } from '../core/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class PlayersSearchService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  user: IUser;
  initialItems: any[];
  items: IPlayer[];

  countrySubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  myFavoritesSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject(false);

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();

  getUser() {
    this.authService.userLoggedSubject$.subscribe((u) => {
      if (u) {
        this.user = u;
      }
    });
    return this.user;
  }

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
    result.subscribe((val) => this.initialItems = val);
    this.initialItems = this.items;

    return result;
  }

  getFilteredItems() {

    this.startLoading();

    let name: string;
    let game: string;
    let country: string;
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
        if (showFavorite) {
          return this.user.favoritePlayers.includes(item.id);
        } else {
          return item;
        }
      });

    this.stopLoading();
    return this.items;

  }

  // searchByName() {

  //   this.startLoading();

  //   let name;
  //   this.searchSubject$.subscribe(val => name = val.toLowerCase());

  //   let resultItemArr;
  //   this.initialItems$.subscribe((itemArr: IPlayer[]) => {
  //     const result = itemArr.filter((item: IPlayer) => item.name.toLowerCase().includes(name));
  //     resultItemArr = result;
  //   });
  //   this.items$.next(resultItemArr);
  //   this.stopLoading();
  // }

  // filterPlayersByGame() {

  //   this.startLoading();

  //   let game;
  //   this.gameSubject$.subscribe(val => game = val);

  //   let resultItemArr;
  //   this.initialItems$.subscribe((itemArr: IPlayer[]) => {
  //     itemArr = itemArr.filter((item: IPlayer) => {
  //       if (game) {
  //         return item.game === game;
  //       } else {
  //         return item.game;
  //       }
  //     });
  //     resultItemArr = itemArr;
  //   });
  //   this.items$.next(resultItemArr);
  //   this.stopLoading();
  // }

  // filterPlayersByCountry() {

  //   this.startLoading();

  //   let country;
  //   this.countrySubject$.subscribe(val => country = val);

  //   let resultItemArr;
  //   this.initialItems$.subscribe((itemArr: IPlayer[]) => {
  //     itemArr = itemArr.filter((item: IPlayer) => {
  //       if (country) {
  //         return item.country === country;
  //       } else {
  //         return item.country;
  //       }
  //     });
  //     resultItemArr = itemArr;
  //   });

  //   this.items$.next(resultItemArr);
  //   this.stopLoading();
  // }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
