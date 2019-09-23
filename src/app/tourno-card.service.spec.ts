import { TestBed } from '@angular/core/testing';

import { TournoCardService } from './shared/tournos-list/tourno-card/tourno-card.service';

describe('TournoCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournoCardService = TestBed.get(TournoCardService);
    expect(service).toBeTruthy();
  });
});
