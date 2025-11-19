import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdTestingPageComponent } from './std-testing-page.component';

describe('StdTestingPageComponent', () => {
  let component: StdTestingPageComponent;
  let fixture: ComponentFixture<StdTestingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdTestingPageComponent]
    });
    fixture = TestBed.createComponent(StdTestingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
