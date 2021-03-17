import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcAssessmentInstallationComponent } from './emc-assessment-installation.component';

describe('EmcAssessmentInstallationComponent', () => {
  let component: EmcAssessmentInstallationComponent;
  let fixture: ComponentFixture<EmcAssessmentInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcAssessmentInstallationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcAssessmentInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
