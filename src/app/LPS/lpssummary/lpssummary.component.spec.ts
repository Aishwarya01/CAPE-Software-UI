import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpssummaryComponent } from './lpssummary.component';

describe('LpssummaryComponent', () => {
  let component: LpssummaryComponent;
  let fixture: ComponentFixture<LpssummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpssummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpssummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
