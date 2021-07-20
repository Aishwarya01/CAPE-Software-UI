import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalreportsComponent } from './finalreports.component';

describe('FinalreportsComponent', () => {
  let component: FinalreportsComponent;
  let fixture: ComponentFixture<FinalreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
