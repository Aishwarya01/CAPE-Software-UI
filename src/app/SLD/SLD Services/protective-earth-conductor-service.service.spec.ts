import { TestBed } from '@angular/core/testing';

import { ProtectiveEarthConductorServicesService } from './protective-earth-conductor-service.service';

describe('ProtectiveEarthConductorServicesService', () => {
  let service: ProtectiveEarthConductorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectiveEarthConductorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
