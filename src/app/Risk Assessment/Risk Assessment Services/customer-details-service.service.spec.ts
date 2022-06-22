import { TestBed } from '@angular/core/testing';

import { CustomerDetailsServiceService } from './customer-details-service.service';

describe('CustomerDetailsServiceService', () => {
  let service: CustomerDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
