import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInBuyMeterComponent } from './sign-in-buy-meter.component';

describe('SignInBuyMeterComponent', () => {
  let component: SignInBuyMeterComponent;
  let fixture: ComponentFixture<SignInBuyMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInBuyMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInBuyMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
