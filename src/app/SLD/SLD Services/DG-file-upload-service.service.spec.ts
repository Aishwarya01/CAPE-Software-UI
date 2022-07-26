import { TestBed } from '@angular/core/testing';

import { DGFileUploadServiceService } from './DG-file-upload-service.service';

describe('DGFileUploadServiceService', () => {
  let service: DGFileUploadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DGFileUploadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
