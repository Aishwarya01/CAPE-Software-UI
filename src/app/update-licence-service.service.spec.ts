import { TestBed } from '@angular/core/testing';

import { UpdateLicenceServiceService } from './update-licence-service.service';

describe('UpdateLicenceServiceService', () => {
  let service: UpdateLicenceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateLicenceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
