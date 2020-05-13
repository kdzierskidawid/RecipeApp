import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const roles = route.data.roles as Array<string>;
    return this.checkLogin(url, roles);
  }

  checkLogin(url: string, roles: Array<string>) {
    if (this.apiService.userLoggedIn()) {
      if (this.apiService.userCanAccessPageWithRoles(roles)) {
        return true;
      } else {
        this.router.navigate(['/access-denied']);
        return false;
      }
    }

    // Storing attempted URL for redirecting
    this.apiService.redirectURL = url;

    this.router.navigate(['/login']);
    return false;
  }

}
