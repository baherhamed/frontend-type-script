import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { definitions } from 'src/app/shared';

import { environment } from 'src/environments/environment';
import { Login } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  securityUrl = `${environment.url}${definitions.api}/security`;
  usersUrl = `${environment.url}${definitions.api}/security/users`;

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: Login;
      }>(
        `${this.securityUrl}/login`,
        login,
        definitions.requestHeadersForLogin()
      )
      .pipe(retry(5));
  }
}
