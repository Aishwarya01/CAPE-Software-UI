import { TestBed } from '@angular/core/testing';

import { InspectorregisterService } from './inspectorregister.service';

describe('InspectorregisterService', () => {
  let service: InspectorregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectorregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
