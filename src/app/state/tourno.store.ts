import { Injectable } from '@angular/core';
import { Tourno } from './tourno.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface TournoState extends EntityState<Tourno> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tourno' })
export class TournoStore extends EntityStore<TournoState> {

  constructor() {
    super();
  }

}

