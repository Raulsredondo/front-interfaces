import { TestBed } from '@angular/core/testing';

import { ProdService } from './prod.service';

describe('ProdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdService = TestBed.get(ProdService);
    expect(service).toBeTruthy();
  });
});
