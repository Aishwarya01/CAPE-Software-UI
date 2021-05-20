import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentupdateComponent } from './departmentupdate.component';

describe('DepartmentupdateComponent', () => {
  let component: DepartmentupdateComponent;
  let fixture: ComponentFixture<DepartmentupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
