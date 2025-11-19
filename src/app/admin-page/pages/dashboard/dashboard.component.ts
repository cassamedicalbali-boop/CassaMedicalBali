import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalArticles: number = 0;

  constructor(
    private adminservice: AdminService,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    if (!this.adminservice.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadTotalArticles();
  }

  loadTotalArticles(): void {
    this.articleService.getAllArticles().subscribe({
      next: (res: any) => {
        // If your API returns { articles: [...] }
        this.totalArticles = Array.isArray(res.articles) ? res.articles.length : 0;
        console.log('Total articles:', this.totalArticles);
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
      }
    });
  }
}
