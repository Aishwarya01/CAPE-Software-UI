import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCBComponent } from './mcb.component';

describe('MCBComponent', () => {
  let component: MCBComponent;
  let fixture: ComponentFixture<MCBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
