import { TestBed } from '@angular/core/testing';

import { RCBOServicesService } from './rcbo-services.service';

describe('RCBOServicesService', () => {
  let service: RCBOServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RCBOServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
