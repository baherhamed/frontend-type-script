import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Promise<boolean> {
    const navigatedRoute = state.url;
    const selectedRoute = navigatedRoute.split('/')[2];
    const isAuthenticated = this.authService.getAuthStatus(selectedRoute);
    if (!isAuthenticated) {
      this.router.navigate(['/security/login']);
    }
    return isAuthenticated;
  }
}
