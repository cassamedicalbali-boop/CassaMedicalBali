import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenguPackagePage } from './dengu-package-page';

describe('DenguPackagePage', () => {
  let component: DenguPackagePage;
  let fixture: ComponentFixture<DenguPackagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenguPackagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenguPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
