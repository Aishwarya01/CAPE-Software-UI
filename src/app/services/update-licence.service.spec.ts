import { TestBed } from '@angular/core/testing';

import { UpdateLicenceService } from './update-licence.service';

describe('UpdateLicenceService', () => {
  let service: UpdateLicenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateLicenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
