import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcMatstepperComponent } from './emc-matstepper.component';

describe('EmcMatstepperComponent', () => {
  let component: EmcMatstepperComponent;
  let fixture: ComponentFixture<EmcMatstepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcMatstepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcMatstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
