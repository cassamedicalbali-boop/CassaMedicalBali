import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestPageComponent } from './lab-test-page.component';

describe('LabTestPageComponent', () => {
  let component: LabTestPageComponent;
  let fixture: ComponentFixture<LabTestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabTestPageComponent]
    });
    fixture = TestBed.createComponent(LabTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
