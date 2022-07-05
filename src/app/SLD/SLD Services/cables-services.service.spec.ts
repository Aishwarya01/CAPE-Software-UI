import { TestBed } from '@angular/core/testing';

import { CablesServicesService } from './cables-services.service';

describe('CablesServicesService', () => {
  let service: CablesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CablesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
