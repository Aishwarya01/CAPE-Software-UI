import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LTMotorComponent } from './ltmotor.component';

describe('LTMotorComponent', () => {
  let component: LTMotorComponent;
  let fixture: ComponentFixture<LTMotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LTMotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LTMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
