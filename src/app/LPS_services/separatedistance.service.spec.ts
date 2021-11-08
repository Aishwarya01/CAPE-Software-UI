import { TestBed } from '@angular/core/testing';

import { SeparatedistanceService } from './separatedistance.service';

describe('SeparatedistanceService', () => {
  let service: SeparatedistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeparatedistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
