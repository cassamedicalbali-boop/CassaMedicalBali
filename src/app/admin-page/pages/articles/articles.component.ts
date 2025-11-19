import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: any[] = [];
  filteredArticles: any[] = [];

  currentPage = 1;
  totalPages = 0;
  pageSize = 6;

  searchQuery: string = '';
  filterDate: string = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadAllArticles();
  }

  loadAllArticles(): void {
    this.articleService.getEveryArticles().subscribe(
      response => {
        this.articles = response.articles.map((article: { description: string }) => {
          let parsedDescription;
          try {
            parsedDescription = JSON.parse(article.description);
            if (!Array.isArray(parsedDescription)) throw new Error();
          } catch {
            parsedDescription = article.description;
          }
          return { ...article, description: parsedDescription };
        });

        this.filteredArticles = [...this.articles];

        this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
      },
      error => {
        console.error("Error loading articles:", error);
      }
    );
  }

  searchArticles(): void {
    const q = this.searchQuery.trim().toLowerCase();
    const selectedDate = this.filterDate ? new Date(this.filterDate).toDateString() : '';

    this.filteredArticles = this.articles.filter(article => {
      const matchesText =
        !q ||
        article.title?.toLowerCase().includes(q) ||
        article.author?.toLowerCase().includes(q);

      const articleDate = article.date ? new Date(article.date).toDateString() : '';
      const matchesDate = !selectedDate || articleDate === selectedDate;

      return matchesText && matchesDate;
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
  }

  get paginatedArticles() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredArticles.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  deleteArticle(id: string) {
    if (!confirm('Delete this article?')) return;

    this.articleService.deleteArticle(id).subscribe(() => {
      this.loadAllArticles();
    });
  }
}
