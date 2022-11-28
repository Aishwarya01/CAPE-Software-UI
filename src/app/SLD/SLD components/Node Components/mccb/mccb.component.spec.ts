import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCCBComponent } from './mccb.component';

describe('MCCBComponent', () => {
  let component: MCCBComponent;
  let fixture: ComponentFixture<MCCBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCCBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCCBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
