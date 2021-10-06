import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeContactnumberComponent } from './change-contactnumber.component';

describe('ChangeContactnumberComponent', () => {
  let component: ChangeContactnumberComponent;
  let fixture: ComponentFixture<ChangeContactnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeContactnumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeContactnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
