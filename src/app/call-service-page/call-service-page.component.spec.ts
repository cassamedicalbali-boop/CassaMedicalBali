import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallServicePageComponent } from './call-service-page.component';

describe('CallServicePageComponent', () => {
  let component: CallServicePageComponent;
  let fixture: ComponentFixture<CallServicePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallServicePageComponent]
    });
    fixture = TestBed.createComponent(CallServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
