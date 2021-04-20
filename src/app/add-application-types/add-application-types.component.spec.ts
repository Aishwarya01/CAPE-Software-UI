import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationTypesComponent } from './add-application-types.component';

describe('AddApplicationTypesComponent', () => {
  let component: AddApplicationTypesComponent;
  let fixture: ComponentFixture<AddApplicationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicationTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
