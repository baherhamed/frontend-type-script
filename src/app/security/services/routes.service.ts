/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { site } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { Route } from '..';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  baseUrl = `${environment.url}${site.api}${site.modules.security}${site.apps.routes}`;
  token = localStorage.getItem(site.token);
  language = localStorage.getItem(site.currentLangValue);
  constructor(private http: HttpClient) {}

  addRoute(route: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}${site.appsRoutes.add}`,
        route,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  updateRoute(route: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}${site.appsRoutes.update}`,
        route,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  searchRoute(route: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}${site.appsRoutes.search}`,
        route,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  getActiveRouts(): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${this.baseUrl}${site.appsRoutes.getActive}`,
        null,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  getAllRouts(pagination?: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}${site.appsRoutes.getAll}`,
        pagination,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  deleteRoute(Route: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: Route }>(
        `${this.baseUrl}${site.appsRoutes.delete}`,
        Route,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }
}
