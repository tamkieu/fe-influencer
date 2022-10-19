import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {CredentialsService} from "@influencer/authenticate";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private credentialsService: CredentialsService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.credentialsService.isAuthenticated()) {
      // This is the injected auth service which depends on what you are using
      return true;
    }
    console.log('access denied!');
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
@Injectable()
export class AuthGuardNotLoggedIn implements CanActivate {
  constructor(
    private credentialsService: CredentialsService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.credentialsService.isAuthenticated()) {
      // This is the injected auth service which depends on what you are using
      return true;
    }
    console.log('access denied!');
    this.router.navigate(['']);
    return false;
  }
}
@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(
    private credentialsService: CredentialsService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.credentialsService.authoritiesConstantsAdmin()) {
      // This is the injected auth service which depends on what you are using
      return true;
    }
    console.log('access denied!');
    this.router.navigate(['']);
    return false;
  }
}
