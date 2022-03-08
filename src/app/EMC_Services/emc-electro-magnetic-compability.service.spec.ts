import { TestBed } from '@angular/core/testing';

import { EmcElectroMagneticCompabilityService } from './emc-electro-magnetic-compability.service';

describe('EmcElectroMagneticCompabilityService', () => {
  let service: EmcElectroMagneticCompabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmcElectroMagneticCompabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
