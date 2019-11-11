import { TestBed } from '@angular/core/testing';

import { MatrizService } from './matriz.service';

describe('MatrizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatrizService = TestBed.get(MatrizService);
    expect(service).toBeTruthy();
  });
});
