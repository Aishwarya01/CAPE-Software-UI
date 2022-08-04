import { TestBed } from '@angular/core/testing';

import { MCBServicesService } from './mcb-services.service';

describe('MCBServicesService', () => {
  let service: MCBServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCBServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
