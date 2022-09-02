import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipotentialBondingComponent } from './equipotential-bonding.component';

describe('EquipotentialBondingComponent', () => {
  let component: EquipotentialBondingComponent;
  let fixture: ComponentFixture<EquipotentialBondingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipotentialBondingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipotentialBondingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
