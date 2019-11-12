import { TestBed } from '@angular/core/testing';

import { NeuralNetworkService } from './neural-network.service';

describe('NeuralNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeuralNetworkService = TestBed.get(NeuralNetworkService);
    expect(service).toBeTruthy();
  });
});
