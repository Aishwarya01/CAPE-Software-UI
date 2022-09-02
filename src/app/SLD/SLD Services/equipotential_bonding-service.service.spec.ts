import { TestBed } from '@angular/core/testing';

import { Equipotential_BondingServicesService } from './equipotential_bonding-service.service';

describe('Equipotential_BondingServicesService', () => {
  let service: Equipotential_BondingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Equipotential_BondingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
