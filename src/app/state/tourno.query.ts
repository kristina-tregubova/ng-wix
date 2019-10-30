import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TournoStore, TournoState } from './tourno.store';

@Injectable({ providedIn: 'root' })
export class TournoQuery extends QueryEntity<TournoState> {

  constructor(protected store: TournoStore) {
    super(store);
  }

}
