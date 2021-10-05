import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOtpContactnumberComponent } from './generate-otp-contactnumber.component';

describe('GenerateOtpContactnumberComponent', () => {
  let component: GenerateOtpContactnumberComponent;
  let fixture: ComponentFixture<GenerateOtpContactnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateOtpContactnumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOtpContactnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
