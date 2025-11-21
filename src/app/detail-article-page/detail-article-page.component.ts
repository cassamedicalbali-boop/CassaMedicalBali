import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

declare var Splide: any;
declare var bootstrap: any;

@Component({
  selector: 'app-detail-article-page',
  templateUrl: './detail-article-page.component.html',
  styleUrls: ['./detail-article-page.component.css'],
})
export class DetailArticlePageComponent implements AfterViewInit, OnDestroy {
  private splide: any;
  relatedArticles: any[] = [];
  article: any = null;
  loading = true;

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // Subscribe to param changes to reload article when clicking related articles
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadArticle(id);
        this.load6Articles();
      }
    });
  }

  loadArticle(id: string) {
    this.loading = true;

    this.articleService.getArticleById(id).subscribe({
      next: (data) => {
        this.article = data;

        // Convert description array into string if needed
        const descriptionText = Array.isArray(data.description)
          ? data.description.join('\n')
          : data.description || '';

        this.article.description = descriptionText;

        // Convert ISO date string to YYYY-MM-DD for input[type=date]
        if (this.article.date) {
          this.article.date = this.article.date.split('T')[0];
        }

        this.loading = false;
        console.log('Article loaded successfully:', data);
      },
      error: (err) => {
        console.error('Error fetching article:', err);
        this.loading = false;
      },
    });
  }

  load6Articles(): void {
    this.articleService.getLatestSixArticles().subscribe((data) => {
      this.relatedArticles = data.filter(
        (a: { _id: any; }) => a._id !== this.article?._id
      ); // Exclude current article

      console.log('Related Articles:', this.relatedArticles);

      // Refresh Splide after DOM updates
      setTimeout(() => {
        if (this.splide) {
          this.splide.refresh();
        } else {
          this.initSplide();
        }
      }, 200);
    });
  }

  truncateHTML(html: string, maxLength: number): string {
    if (!html) return '';

    const div = document.createElement('div');
    div.innerHTML = html;
    let text = div.textContent || div.innerText || '';

    if (text.length > maxLength) {
      text = text.substr(0, maxLength) + '...';
    }

    div.textContent = text;
    return div.innerHTML;
  }

  ngAfterViewInit(): void {
    this.initSplide();
  }

  initSplide() {
    this.splide = new Splide('#article-slider', {
      perPage: 3,
      gap: '1rem',
      pagination: false,
      arrows: false,
      padding: {
        left: 0,
        right: '50%',
      },
      breakpoints: {
        848:{
          perPage: 2,
          gap: '1rem',
        },
        768: {
          perPage: 2,
          gap: '1rem',
        },
        576: {
          perPage: 1,
          gap: '1rem',
        },
      },
    });

    this.splide.mount();
  }

  goPrev() {
    this.splide.go('<');
  }

  goNext() {
    this.splide.go('>');
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.splide?.destroy();
  }

     closeOffcanvas(): void {
    const offcanvasElement = document.getElementById('navbarOffcanvasLg');
    if (offcanvasElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
