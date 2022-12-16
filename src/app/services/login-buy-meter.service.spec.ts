import { TestBed } from '@angular/core/testing';

import { LoginBuyMeterService } from './login-buy-meter.service';

describe('LoginBuyMeterService', () => {
  let service: LoginBuyMeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginBuyMeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
