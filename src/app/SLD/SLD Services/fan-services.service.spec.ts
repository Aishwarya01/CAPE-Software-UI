import { TestBed } from '@angular/core/testing';

import { FanServicesService } from './fan-services.service';

describe('FanServicesService', () => {
  let service: FanServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
