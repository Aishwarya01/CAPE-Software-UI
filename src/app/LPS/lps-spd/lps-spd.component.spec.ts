import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsSpdComponent } from './lps-spd.component';

describe('LpsSpdComponent', () => {
  let component: LpsSpdComponent;
  let fixture: ComponentFixture<LpsSpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsSpdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsSpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
