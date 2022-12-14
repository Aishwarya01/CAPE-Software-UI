import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartBuyMeterComponent } from './add-cart-buy-meter.component';

describe('AddCartBuyMeterComponent', () => {
  let component: AddCartBuyMeterComponent;
  let fixture: ComponentFixture<AddCartBuyMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCartBuyMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartBuyMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
