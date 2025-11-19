import { Component, ElementRef, ViewChild } from '@angular/core';
import { Jodit } from 'jodit';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  constructor(
    private adminservice: AdminService,
    private router: Router,
    private articleService: ArticleService
  ) {}

  articles: any[] = [];

  ngOnInit(): void {
    if (!this.adminservice.isAdmin()) {
      this.router.navigate(['/login']);
    }
    this.loadAllArticles();
  }

  loadAllArticles(): void {
    this.articleService.getEveryArticles().subscribe(
      (response) => {
        this.articles = response.articles.map(
          (article: { description: string }) => {
            let parsedDescription;
            try {
              parsedDescription = JSON.parse(article.description);
              if (!Array.isArray(parsedDescription)) throw new Error();
            } catch {
              parsedDescription = article.description;
            }
            return { ...article, description: parsedDescription };
          }
        );
      },
      (error) => {
        console.error('Error loading articles:', error);
      }
    );
  }

  logout() {
    this.adminservice.logout();
    this.router.navigate(['/login']);
  }
}
