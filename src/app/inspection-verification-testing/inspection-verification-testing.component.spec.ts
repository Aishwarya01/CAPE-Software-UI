import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionVerificationTestingComponent } from './inspection-verification-testing.component';

describe('InspectionVerificationTestingComponent', () => {
  let component: InspectionVerificationTestingComponent;
  let fixture: ComponentFixture<InspectionVerificationTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionVerificationTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionVerificationTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
