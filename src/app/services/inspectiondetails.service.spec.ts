import { TestBed } from '@angular/core/testing';

import { InspectiondetailsService } from './inspectiondetails.service';

describe('InspectiondetailsService', () => {
  let service: InspectiondetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectiondetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
