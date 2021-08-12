import { TestBed } from '@angular/core/testing';

import { InspectionVerificationService } from './inspection-verification.service';

describe('InspectionVerificationService', () => {
  let service: InspectionVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
