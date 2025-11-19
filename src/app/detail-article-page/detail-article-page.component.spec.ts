import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArticlePageComponent } from './detail-article-page.component';

describe('DetailArticlePageComponent', () => {
  let component: DetailArticlePageComponent;
  let fixture: ComponentFixture<DetailArticlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailArticlePageComponent]
    });
    fixture = TestBed.createComponent(DetailArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
