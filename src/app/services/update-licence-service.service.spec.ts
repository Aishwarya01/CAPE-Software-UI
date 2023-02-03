import { TestBed } from '@angular/core/testing';

import { UpdateLicenceService } from '../services/update-licence-service.service';

describe('UpdateLicenceServiceService', () => {
  let service: UpdateLicenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateLicenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
