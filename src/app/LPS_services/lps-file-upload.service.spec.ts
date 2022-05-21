import { TestBed } from '@angular/core/testing';

import { LpsFileUploadService } from './lps-file-upload.service';

describe('LpsFileUploadService', () => {
  let service: LpsFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LpsFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
