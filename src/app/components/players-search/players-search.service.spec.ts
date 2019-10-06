import { TestBed } from '@angular/core/testing';

import { PlayersSearchService } from './players-search.service';

describe('PlayersSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayersSearchService = TestBed.get(PlayersSearchService);
    expect(service).toBeTruthy();
  });
});
