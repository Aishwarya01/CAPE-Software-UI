import { TestBed } from '@angular/core/testing';

import { EmcSavedReportService } from './emc-saved-report.service';

describe('EmcSavedReportService', () => {
  let service: EmcSavedReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmcSavedReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
