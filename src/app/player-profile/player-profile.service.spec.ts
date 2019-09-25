import { TestBed } from '@angular/core/testing';

import { PlayerProfileService } from './player-profile.service';

describe('PlayerProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerProfileService = TestBed.get(PlayerProfileService);
    expect(service).toBeTruthy();
  });
});
