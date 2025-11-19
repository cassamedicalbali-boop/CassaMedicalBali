import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellyPackageComponent } from './belly-package.component';

describe('BellyPackageComponent', () => {
  let component: BellyPackageComponent;
  let fixture: ComponentFixture<BellyPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BellyPackageComponent]
    });
    fixture = TestBed.createComponent(BellyPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
