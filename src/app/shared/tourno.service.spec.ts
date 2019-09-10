import { TestBed } from '@angular/core/testing';

import { TournoService } from './tourno.service';

describe('TournoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournoService = TestBed.get(TournoService);
    expect(service).toBeTruthy();
  });
});
