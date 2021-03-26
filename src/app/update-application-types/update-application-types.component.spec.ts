import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicationTypesComponent } from './update-application-types.component';

describe('UpdateApplicationTypesComponent', () => {
  let component: UpdateApplicationTypesComponent;
  let fixture: ComponentFixture<UpdateApplicationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateApplicationTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApplicationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
