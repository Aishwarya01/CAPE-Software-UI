import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDialogBoxComponent } from './testing-dialog-box.component';

describe('TestingDialogBoxComponent', () => {
  let component: TestingDialogBoxComponent;
  let fixture: ComponentFixture<TestingDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
