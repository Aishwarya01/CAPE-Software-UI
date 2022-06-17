import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramListComponent } from './diagram-list.component';

describe('DiagramListComponent', () => {
  let component: DiagramListComponent;
  let fixture: ComponentFixture<DiagramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
