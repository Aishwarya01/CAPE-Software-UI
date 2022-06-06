import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramWelcomePageComponent } from './diagram-welcome-page.component';

describe('DiagramWelcomePageComponent', () => {
  let component: DiagramWelcomePageComponent;
  let fixture: ComponentFixture<DiagramWelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramWelcomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
