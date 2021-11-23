import { TestBed } from '@angular/core/testing';

import { LPSBasicDetailsService } from './lpsbasic-details.service';

describe('LPSBasicDetailsService', () => {
  let service: LPSBasicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LPSBasicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
