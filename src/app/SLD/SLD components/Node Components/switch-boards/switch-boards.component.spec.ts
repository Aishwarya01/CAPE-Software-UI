import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBoardsComponent } from './switch-boards.component';

describe('SwitchBoardsComponent', () => {
  let component: SwitchBoardsComponent;
  let fixture: ComponentFixture<SwitchBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
