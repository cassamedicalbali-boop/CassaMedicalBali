import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryTestingPageComponent } from './laboratory-testing-page.component';

describe('LaboratoryTestingPageComponent', () => {
  let component: LaboratoryTestingPageComponent;
  let fixture: ComponentFixture<LaboratoryTestingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoryTestingPageComponent]
    });
    fixture = TestBed.createComponent(LaboratoryTestingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
