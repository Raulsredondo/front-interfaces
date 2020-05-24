import { TestBed } from '@angular/core/testing';

import { ProdpresService } from './prodpres.service';

describe('ProdpresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdpresService = TestBed.get(ProdpresService);
    expect(service).toBeTruthy();
  });
});
