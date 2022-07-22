import { TestBed } from '@angular/core/testing';

import { TransformerFileUploadServiceService } from './transformer-file-upload-service.service';

describe('TransformerFileUploadServiceService', () => {
  let service: TransformerFileUploadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformerFileUploadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
