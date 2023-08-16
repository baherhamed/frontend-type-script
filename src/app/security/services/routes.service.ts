import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { definitions } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { Route } from '..';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  baseUrl = `${environment.url}${definitions.api}/security/routes`;
  token = localStorage.getItem(definitions.token);
  language = localStorage.getItem(definitions.currentLangValue);
  constructor(private http: HttpClient) {}

  addRoute(route: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}/add`,
        route,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  updateRoute(route: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}/update`,
        route,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  searchRoute(route: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}/search`,
        route,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getActiveRouts(): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${this.baseUrl}/getActive`,
        null,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getAllRouts(pagination?: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}/getAll`,
        pagination,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  deleteRoute(Route: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}/delete`,
        Route,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }
}
