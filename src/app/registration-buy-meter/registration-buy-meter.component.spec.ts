import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationBuyMeterComponent } from './registration-buy-meter.component';

describe('RegistrationBuyMeterComponent', () => {
  let component: RegistrationBuyMeterComponent;
  let fixture: ComponentFixture<RegistrationBuyMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationBuyMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationBuyMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
