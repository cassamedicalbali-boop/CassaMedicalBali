import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunePackagePage } from './immune-package-page';

describe('ImmunePackagePage', () => {
  let component: ImmunePackagePage;
  let fixture: ComponentFixture<ImmunePackagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmunePackagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmunePackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
