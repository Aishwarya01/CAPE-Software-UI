import { TestBed } from '@angular/core/testing';

import { EmcPowerAndEarthingDataService } from './emc-power-and-earthing-data.service';

describe('EmcPowerAndEarthingDataService', () => {
  let service: EmcPowerAndEarthingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmcPowerAndEarthingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
