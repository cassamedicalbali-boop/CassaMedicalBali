import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangoverPackagePage } from './hangover-package-page';

describe('HangoverPackagePage', () => {
  let component: HangoverPackagePage;
  let fixture: ComponentFixture<HangoverPackagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangoverPackagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangoverPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
