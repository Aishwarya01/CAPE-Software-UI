import { TestBed } from '@angular/core/testing';

import { SummarydetailsService } from './summarydetails.service';

describe('SummarydetailsService', () => {
  let service: SummarydetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummarydetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
