import { Injectable } from '@angular/core';
import { CredentialsService } from './credentials.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  authenticationAsOb = new BehaviorSubject<boolean>(
    this.credentialsService.isAuthenticated()
  );
  getAuthenticationAsOb = this.authenticationAsOb.asObservable();

  constructor(private credentialsService: CredentialsService) {}

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUser(): any {
    let credentials = localStorage.getItem('credentials');
    return credentials? JSON.parse(credentials): null;
  }

  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }
  isAuthenticated() {
    return this.credentialsService.isAuthenticated();
  }

  getLoginName() {
    return this.credentialsService.getNameLogged();
  }

  authoritiesConstantsAdmin() {
    return this.credentialsService.authoritiesConstantsAdmin();
  }

  storeAuthenticationToken(data: any): Observable<boolean> {
    this.credentialsService.setCredentials(data, data.remember);
    this.authenticationAsOb.next(true);
    return of(true);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    this.authenticationAsOb.next(false);
    return of(true);
  }
}
