import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentDetailsComponent } from './risk-assessment-details.component';

describe('RiskAssessmentDetailsComponent', () => {
  let component: RiskAssessmentDetailsComponent;
  let fixture: ComponentFixture<RiskAssessmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAssessmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
