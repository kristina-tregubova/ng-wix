import { TestBed } from '@angular/core/testing';

import { PlayerCardService } from './player-card.service';

describe('PlayerCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerCardService = TestBed.get(PlayerCardService);
    expect(service).toBeTruthy();
  });
});
