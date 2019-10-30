import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TournoStore } from './tourno.store';
import { Tourno } from './tourno.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TournoService {

  constructor(private tournoStore: TournoStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Tourno[]>('https://api.com').pipe(tap(entities => {
      this.tournoStore.set(entities);
    }));
  }

  add(tourno: Tourno) {
    this.tournoStore.add(tourno);
  }

  update(id, tourno: Partial<Tourno>) {
    this.tournoStore.update(id, tourno);
  }

  remove(id: ID) {
    this.tournoStore.remove(id);
  }
}
