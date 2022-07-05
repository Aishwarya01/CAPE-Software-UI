import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CableConnectorComponent } from './cable-connector.component';

describe('CableConnectorComponent', () => {
  let component: CableConnectorComponent;
  let fixture: ComponentFixture<CableConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CableConnectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CableConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
