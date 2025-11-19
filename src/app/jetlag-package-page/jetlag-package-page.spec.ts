import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JetlagPackagePage } from './jetlag-package-page';

describe('JetlagPackagePage', () => {
  let component: JetlagPackagePage;
  let fixture: ComponentFixture<JetlagPackagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JetlagPackagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JetlagPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
