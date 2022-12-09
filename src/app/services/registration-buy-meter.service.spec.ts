import { TestBed } from '@angular/core/testing';

import { RegistrationBuyMeterService } from './registration-buy-meter.service';

describe('RegistrationBuyMeterService', () => {
  let service: RegistrationBuyMeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationBuyMeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
