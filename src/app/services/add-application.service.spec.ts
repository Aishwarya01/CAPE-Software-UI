import { TestBed } from '@angular/core/testing';

import { AddApplicationService } from './add-application.service';

describe('AddApplicationService', () => {
  let service: AddApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
