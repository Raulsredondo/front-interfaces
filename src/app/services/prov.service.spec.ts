import { TestBed } from '@angular/core/testing';

import { ProvService } from './prov.service';

describe('GamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvService = TestBed.get(ProvService);
    expect(service).toBeTruthy();
  });
});
