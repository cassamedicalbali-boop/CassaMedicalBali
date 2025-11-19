import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { WebsiteService } from '../services/website.service';

declare var bootstrap: any;

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  articles: any[] = [];
  currentPage = 1;
  totalPages = 0;
  pageSize = 6;
  website: any;

  constructor(
    private articleService: ArticleService,
    private websiteservice: WebsiteService
  ) {}

  ngOnInit(): void {
    this.loadArticles(this.currentPage);
    this.fetchWebsite();
  }

  fetchWebsite(): void {
    this.websiteservice.getWebsiteData().subscribe(data => {
      this.website = data;
      console.log('Website:', this.website);
    });
  }

  loadArticles(page: number): void {
    this.articleService.getArticles(page, this.pageSize).subscribe(
      response => {
        this.articles = response.articles.map((article: { description: string }) => {
          let parsedDescription;
          try {
            parsedDescription = JSON.parse(article.description);
            if (!Array.isArray(parsedDescription)) {
              throw new Error('Invalid format');
            }
          } catch (e) {
            parsedDescription = article.description;
          }
          return { ...article, description: parsedDescription };
        });

        this.totalPages = response.totalPages;
        console.log('Articles:', this.articles);
      },
      error => {
        console.error('Error loading articles:', error);
      }
    );
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadArticles(newPage);
    }
  }

  truncateHTML(html: string, maxLength: number): string {
  if (!html) return '';

  // Strip HTML tags temporarily to count characters
  const div = document.createElement('div');
  div.innerHTML = html;
  let text = div.textContent || div.innerText || '';

  if (text.length > maxLength) {
    text = text.substr(0, maxLength) + '...';
  }

  // Keep original HTML structure but truncate text nodes
  div.textContent = text;
  return div.innerHTML;
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
