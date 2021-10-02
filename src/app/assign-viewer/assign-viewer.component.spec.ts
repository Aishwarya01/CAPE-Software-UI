import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignViewerComponent } from './assign-viewer.component';

describe('AssignViewerComponent', () => {
  let component: AssignViewerComponent;
  let fixture: ComponentFixture<AssignViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
