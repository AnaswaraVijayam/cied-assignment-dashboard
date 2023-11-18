import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLeadsStatusComponent } from './active-leads-status.component';

describe('ActiveLeadsStatusComponent', () => {
  let component: ActiveLeadsStatusComponent;
  let fixture: ComponentFixture<ActiveLeadsStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveLeadsStatusComponent]
    });
    fixture = TestBed.createComponent(ActiveLeadsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
