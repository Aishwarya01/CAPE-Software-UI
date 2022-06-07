import { TestBed } from '@angular/core/testing';

import { RiskfinalpdfService } from './riskfinalpdf.service';

describe('RiskfinalpdfService', () => {
  let service: RiskfinalpdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskfinalpdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
