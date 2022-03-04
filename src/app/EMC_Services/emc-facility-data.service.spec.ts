import { TestBed } from '@angular/core/testing';

import { EmcFacilityDataService } from './emc-facility-data.service';

describe('EmcFacilityDataService', () => {
  let service: EmcFacilityDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmcFacilityDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
