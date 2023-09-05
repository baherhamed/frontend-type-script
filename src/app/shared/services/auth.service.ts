/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getTokenValue } from '../common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenValues: any;
  routesList: any;
  userLoggedIn = false;
  authorized = false;
  constructor(private router: Router) {}

  async getAuthStatus(url: string) {
    this.tokenValues = await getTokenValue();
    this.routesList = this.tokenValues.routesList;
    this.userLoggedIn = this.tokenValues.userLoggedIn;

    let selectedUrl;
    if (
      this.routesList &&
      this.routesList.length === 1 &&
      this.routesList.includes('*')
    ) {
      selectedUrl = '*';
    } else {
      selectedUrl = url;
    }

    if (!this.tokenValues) {
      this.userLoggedIn = false;
      this.authorized = false;
      this.router.navigate(['/security/login']);
    } else if (this.userLoggedIn && !this.routesList.includes(selectedUrl)) {
      this.router.navigate(['/']);
      this.authorized = false;
    } else if (this.userLoggedIn && this.routesList.includes(selectedUrl)) {
      this.userLoggedIn = this.tokenValues.userLoggedIn;
      this.authorized = true;
    }

    return this.authorized;
  }
}
