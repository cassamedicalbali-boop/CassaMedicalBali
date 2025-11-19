import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluPackagePage } from './flu-package-page';

describe('FluPackagePage', () => {
  let component: FluPackagePage;
  let fixture: ComponentFixture<FluPackagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluPackagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
