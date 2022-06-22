import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskParentComponentComponent } from './risk-parent-component.component';

describe('RiskParentComponentComponent', () => {
  let component: RiskParentComponentComponent;
  let fixture: ComponentFixture<RiskParentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskParentComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskParentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
