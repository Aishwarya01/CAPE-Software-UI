import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsEarthStudComponent } from './lps-earth-stud.component';

describe('LpsEarthStudComponent', () => {
  let component: LpsEarthStudComponent;
  let fixture: ComponentFixture<LpsEarthStudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsEarthStudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsEarthStudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
