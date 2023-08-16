import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { definitions } from 'src/app/shared';

import { environment } from 'src/environments/environment';
import { ChangePassword, User } from '..';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersUrl = `${environment.url}/api/security/users`;
  token = localStorage.getItem(definitions.token);
  language = localStorage.getItem(definitions.currentLangValue);

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('accept-language', `${this.language}`)
    .set('Authorization', `Bearer ${this.token}`);

  addUser(user: any): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: any;
      }>(`${this.usersUrl}/add`, user, {
        headers: definitions.requestHeaders().headers,
      })
      .pipe(retry(5));
  }

  updateUser(user: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}/update`,
        user,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  deleteUser(user: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}/delete`,
        user,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  searchUser(user: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}/search`,
        user,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }
  
  getAllUsers(pagination?: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}/getAll`,
        pagination,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  getActiveUsers() {
    return this.http
      .post<{ success: boolean; message: string; data: User[] }>(
        `${this.usersUrl}/getActive`,
        null,
        { headers: definitions.requestHeaders().headers }
      )
      .pipe(retry(5));
  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: ChangePassword;
      }>(`${this.usersUrl}/changePassword`, changePassword, {
        headers: definitions.requestHeaders().headers,
      })
      .pipe(retry(5));
  }
}
