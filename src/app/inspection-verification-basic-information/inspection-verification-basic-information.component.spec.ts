import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionVerificationBasicInformationComponent } from './inspection-verification-basic-information.component';

describe('InspectionVerificationBasicInformationComponent', () => {
  let component: InspectionVerificationBasicInformationComponent;
  let fixture: ComponentFixture<InspectionVerificationBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionVerificationBasicInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionVerificationBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
