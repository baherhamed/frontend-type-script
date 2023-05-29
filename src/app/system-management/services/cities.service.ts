import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { definitions } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  citiesUrl = `${environment.url}/api/systemManagement/cities`;
  token = localStorage.getItem(definitions.token);
  language = localStorage.getItem(definitions.currentLangValue);

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('accept-language', `${this.language}`)
    .set('Authorization', `Bearer ${this.token}`);

  addCity(city: any): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: any;
      }>(`${this.citiesUrl}/add`, city, {
        headers: definitions.requestHeaders().headers,
      })
      .pipe(retry(5));
  }

  updateCity(city: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: any }>(
        `${this.citiesUrl}/update`,
        city,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  deleteCity(city: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: any }>(
        `${this.citiesUrl}/delete`,
        city,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  searchCity(city: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${this.citiesUrl}/search`,
        city,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getCitiesByGov(city: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${this.citiesUrl}/getCitiesByGov`,
        city,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getAllCities(pagination?: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${this.citiesUrl}/getAll`,
        pagination,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getActiveCities() {
    return this.http
      .post<{ success: boolean; message: string; data: [] }>(
        `${this.citiesUrl}/getActive`,
        null,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }
}
