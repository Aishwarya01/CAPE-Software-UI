import { TestBed } from '@angular/core/testing';

import { PortableApplianceServicesService } from './portable-appliance-services.service';

describe('PortableApplianceServicesService', () => {
  let service: PortableApplianceServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortableApplianceServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
