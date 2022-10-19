import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import {User} from "@influencer/api-client";

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}
const helper = new JwtHelperService();
const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _user: User | null = null;
  private _loginName: string | null = null;

  constructor() {
    try {
      const savedCredentials =
        sessionStorage.getItem(credentialsKey) ||
        localStorage.getItem(credentialsKey);
      if (savedCredentials) {
        this._user = JSON.parse(savedCredentials);
        const loginName =
          sessionStorage.getItem('loginName') ||
          localStorage.getItem('loginName');
        if (loginName) {
          this._loginName = JSON.parse(loginName);
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  authoritiesConstantsAdmin(): boolean {
    if (this._user != null) {
      if (this._user.role === 'ADMIN') {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  getNameLogged(): string | undefined {
    if (this._user != null) {
      return this._user.name;
    }
    return undefined;
  }
  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): User | null {
    return this._user;
  }

  get getLoginName(): string | null {
    return this._loginName;
  }

  logout(): Observable<boolean> {
    this.setCredentials();
    // this.authenticateFacade.logOutAction();
    return of(true);
  }
  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(user?: User, remember?: boolean) {
    this._user = user || null;
    if (user) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      localStorage.removeItem('loginName');
    }
  }
}
