import { TestBed } from '@angular/core/testing';

import { RiskAssessmentDetailsServiceService } from './risk-assessment-details-service.service';

describe('RiskAssessmentDetailsServiceService', () => {
  let service: RiskAssessmentDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskAssessmentDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
