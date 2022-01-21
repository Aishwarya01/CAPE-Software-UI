import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcSavedReportComponent } from './emc-saved-report.component';

describe('EmcSavedReportComponent', () => {
  let component: EmcSavedReportComponent;
  let fixture: ComponentFixture<EmcSavedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcSavedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcSavedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
