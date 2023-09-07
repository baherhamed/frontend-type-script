/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { site } from 'src/app/shared';

import { environment } from 'src/environments/environment';
import { ChangePassword, User } from '..';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersUrl = `${environment.url}${site.api}${site.modules.security}${site.apps.users}`;
  token = localStorage.getItem(site.token);
  language = localStorage.getItem(site.currentLangValue);

  constructor(private http: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: any;
      }>(`${this.usersUrl}${site.appsRoutes.add}`, user, {
        headers: site.requestHeaders().headers,
      })
      .pipe(retry(5));
  }

  updateUser(user: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}${site.appsRoutes.update}`,
        user,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  deleteUser(user: any): Observable<any> {
    return this.http
      .put<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}${site.appsRoutes.delete}`,
        user,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  searchUser(user: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}${site.appsRoutes.search}`,
        user,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  getAllUsers(pagination?: any): Observable<any> {
    return this.http
      .post<{ success: boolean; message: string; data: User }>(
        `${this.usersUrl}${site.appsRoutes.getAll}`,
        pagination,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  getActiveUsers() {
    return this.http
      .post<{ success: boolean; message: string; data: User[] }>(
        `${this.usersUrl}${site.appsRoutes.getAll}`,
        null,
        { headers: site.requestHeaders().headers },
      )
      .pipe(retry(5));
  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: ChangePassword;
      }>(`${this.usersUrl}${site.appsRoutes.changePassword}`, changePassword, {
        headers: site.requestHeaders().headers,
      })
      .pipe(retry(5));
  }
}
