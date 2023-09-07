import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { site } from '..';

import { Language } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DefinitionsService {
  languageUrl = `${environment.url}${site.api}${site.modules.systemManagement}${site.apps.languages}`;
  token = localStorage.getItem(site.token);
  language = localStorage.getItem(site.currentLangValue);

  constructor(private http: HttpClient) {}

  getActiveLanguages() {
    return this.http.post<{
      success: boolean;
      message: string;
      data: Language[];
    }>(`${this.languageUrl}${site.appsRoutes.getActive}`, null, {
      headers: site.requestHeaders().headers,
      // observe: 'response',
    });
  }
}
