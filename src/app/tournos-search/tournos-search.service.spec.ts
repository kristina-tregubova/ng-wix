import { TestBed } from '@angular/core/testing';

import { TournosSearchService } from './tournos-search.service';

describe('TournosSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournosSearchService = TestBed.get(TournosSearchService);
    expect(service).toBeTruthy();
  });
});
