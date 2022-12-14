import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRes} from "@influencer/api-client";
const credentialsKey = 'credentials';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  private _credentials: LoginRes | null = null;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._credentials?.data?.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
