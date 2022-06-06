import { TestBed } from '@angular/core/testing';

import { DiagramServicesService } from './diagram-services.service';

describe('DiagramServicesService', () => {
  let service: DiagramServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagramServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
