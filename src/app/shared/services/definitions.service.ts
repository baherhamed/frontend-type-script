import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { definitions } from '..';

import { Language } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DefinitionsService {
  languageUrl = `${environment.url}/api/system_management/languages`;
  token = localStorage.getItem(definitions.token);
  language = localStorage.getItem(definitions.currentLangValue);

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('accept-language', `${this.language}`)
    .set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  getActiveLanguages() {
    return this.http.post<{
      success: boolean;
      message: string;
      data: Language[];
    }>(`${this.languageUrl}/get_active_languages`, null, {
      headers: this.headers,
      // observe: 'response',
    });
  }
}
