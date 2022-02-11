import { TestBed } from '@angular/core/testing';

import { FinalPdfServiceService } from './final-pdf-service.service';

describe('FinalPdfServiceService', () => {
  let service: FinalPdfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalPdfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
