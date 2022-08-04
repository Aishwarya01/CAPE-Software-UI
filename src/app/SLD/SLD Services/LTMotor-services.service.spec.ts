import { TestBed } from '@angular/core/testing';

import { LTMotorServicesService } from './LTMotor-services.service';

describe('LTMotorServicesService', () => {
  let service: LTMotorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LTMotorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
