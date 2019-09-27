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
  ) { 
    this.user = this.authService.getUserLogged;
  }

  user: IUser;
  initialItems: any[];
  items: IPlayer[];

  countrySubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  searchSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  myFavoritesSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject(false);

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
      tap((res) => {
        this.initialItems = res;
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
  

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
