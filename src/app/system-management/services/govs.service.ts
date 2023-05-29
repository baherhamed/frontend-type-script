import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { definitions } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { Gov } from '..';

@Injectable({
  providedIn: 'root',
})
export class GovsService {
  govsUrl = `${environment.url}/api/systemManagement/govs`;
  token = localStorage.getItem(definitions.token);
  language = localStorage.getItem(definitions.currentLangValue);

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('accept-language', `${this.language}`)
    .set('Authorization', `Bearer ${this.token}`);

  addGov(gov: Gov): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: Gov;
      }>(`${this.govsUrl}/add`, gov, {
        headers: definitions.requestHeaders().headers,
      })
      .pipe(retry(5));
  }

  updateGov(gov: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: Gov }>(
        `${this.govsUrl}/update`,
        gov,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  deleteGov(gov: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: any }>(
        `${this.govsUrl}/delete`,
        gov,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  searchGov(gov: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Gov }>(
        `${this.govsUrl}/search`,
        gov,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getAllGovs(pagination?: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: Gov }>(
        `${this.govsUrl}/getAll`,
        pagination,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getActiveGovs() {
    return this.http
      .post<{ success: boolean; message: string; data: Gov[] }>(
        `${this.govsUrl}/getActive`,
        null,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }
}
