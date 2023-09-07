/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { site } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { Gov } from '..';

@Injectable({
  providedIn: 'root',
})
export class GovsService {
  govsUrl = `${environment.url}${site.api}${site.modules.systemManagement}${site.apps.govs}`;
  token = localStorage.getItem(site.token);
  language = localStorage.getItem(site.currentLangValue);

  constructor(private http: HttpClient) {}

  addGov(gov: Gov): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: Gov;
      }>(`${this.govsUrl}${site.appsRoutes.add}`, gov, {
        headers: site.requestHeaders().headers,
      })
      .pipe(retry(5));
  }

  updateGov(gov: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: Gov }>(
        `${this.govsUrl}${site.appsRoutes.update}`,
        gov,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  deleteGov(gov: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: any }>(
        `${this.govsUrl}${site.appsRoutes.delete}`,
        gov,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  searchGov(gov: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Gov }>(
        `${this.govsUrl}${site.appsRoutes.search}`,
        gov,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  getAllGovs(pagination?: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Gov }>(
        `${this.govsUrl}${site.appsRoutes.getAll}`,
        pagination,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  getActiveGovs() {
    return this.http
      .post<{ success: boolean; message: string; data: Gov[] }>(
        `${this.govsUrl}${site.appsRoutes.getActive}`,
        null,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }
}
