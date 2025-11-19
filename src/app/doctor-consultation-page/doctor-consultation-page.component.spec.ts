import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultationPageComponent } from './doctor-consultation-page.component';

describe('DoctorConsultationPageComponent', () => {
  let component: DoctorConsultationPageComponent;
  let fixture: ComponentFixture<DoctorConsultationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorConsultationPageComponent]
    });
    fixture = TestBed.createComponent(DoctorConsultationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
