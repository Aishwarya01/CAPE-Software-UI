import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsDownConductorsComponent } from './lps-down-conductors.component';

describe('LpsDownConductorsComponent', () => {
  let component: LpsDownConductorsComponent;
  let fixture: ComponentFixture<LpsDownConductorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsDownConductorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsDownConductorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
