import { TestBed } from '@angular/core/testing';

import { MCCBServicesService } from './mccb-services.service';

describe('MCCBServicesService', () => {
  let service: MCCBServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCCBServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
