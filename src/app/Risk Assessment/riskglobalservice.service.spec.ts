import { TestBed } from '@angular/core/testing';

import { RiskglobalserviceService } from './riskglobalservice.service';

describe('RiskglobalserviceService', () => {
  let service: RiskglobalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskglobalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
