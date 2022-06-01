import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcFinalReportComponent } from './emc-final-report.component';

describe('EmcFinalReportComponent', () => {
  let component: EmcFinalReportComponent;
  let fixture: ComponentFixture<EmcFinalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcFinalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcFinalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
