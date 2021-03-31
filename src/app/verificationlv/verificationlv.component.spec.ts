import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationlvComponent } from './verificationlv.component';

describe('VerificationlvComponent', () => {
  let component: VerificationlvComponent;
  let fixture: ComponentFixture<VerificationlvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationlvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationlvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
