import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    const navigatedRoute = state.url;
    const selectedRoute = navigatedRoute.split('/')[2];
    var isAuthenticated = this.authService.getAuthStatus(selectedRoute);
    if (!isAuthenticated) {
      this.router.navigate(['/security/login']);
    }
    return isAuthenticated;
  }
}
