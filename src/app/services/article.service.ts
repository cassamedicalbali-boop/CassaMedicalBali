import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:5000/api'
  //private baseUrl = 'https://cassamedicalclinic.vercel.app/api';

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articles`);
  }

  getEveryArticles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articles/all`);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articles/${id}`);
  }

  createArticle(articleData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/articles`, articleData);
  }

  updateArticle(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/articles/${id}`, formData);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/articles/${id}`);
  }

  getLatestSixArticles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articles/latest`);
  }

  getArticles(page: number, pageSize: number = 6): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articles?page=${page}&pageSize=${pageSize}`);
  }
}
