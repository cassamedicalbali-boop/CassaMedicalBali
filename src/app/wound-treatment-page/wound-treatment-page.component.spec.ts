import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoundTreatmentPageComponent } from './wound-treatment-page.component';

describe('WoundTreatmentPageComponent', () => {
  let component: WoundTreatmentPageComponent;
  let fixture: ComponentFixture<WoundTreatmentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WoundTreatmentPageComponent]
    });
    fixture = TestBed.createComponent(WoundTreatmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
