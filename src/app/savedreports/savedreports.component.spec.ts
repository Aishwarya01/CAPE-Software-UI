import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedreportsComponent } from './savedreports.component';

describe('SavedreportsComponent', () => {
  let component: SavedreportsComponent;
  let fixture: ComponentFixture<SavedreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
