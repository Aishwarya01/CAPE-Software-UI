import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBuyMeterComponent } from './checkout-buy-meter.component';

describe('CheckoutBuyMeterComponent', () => {
  let component: CheckoutBuyMeterComponent;
  let fixture: ComponentFixture<CheckoutBuyMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutBuyMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutBuyMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
