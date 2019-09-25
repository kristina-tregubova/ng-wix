import { TestBed } from '@angular/core/testing';

import { TournoProfileService } from './tourno-profile.service';

describe('TournoProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournoProfileService = TestBed.get(TournoProfileService);
    expect(service).toBeTruthy();
  });
});
