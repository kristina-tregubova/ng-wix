import { TestBed } from '@angular/core/testing';

import { TournoCreationService } from './tourno-creation.service';

describe('TournoCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournoCreationService = TestBed.get(TournoCreationService);
    expect(service).toBeTruthy();
  });
});
