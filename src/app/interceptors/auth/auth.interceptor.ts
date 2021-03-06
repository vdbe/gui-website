import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TokenService } from '../..//services/token/token.service';
import { AuthService } from '../../services/auth/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';
const API_BLACKLIST = ['/auth/login', '/auth/logout', '/auth/register', '/auth/token'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    // Don't add bearer token for request not to the api
    if (!request.url.startsWith(environment.apiUrl) || API_BLACKLIST.some((route) => request.url.slice(environment.apiUrl.length).startsWith(route)))
      return next.handle(request);

    const authToken = TokenService.getAuthToken();

    // No auth-token means also no refresh token -> no point in refreshing
    if (authToken == null) {
      return next.handle(request);
    }

    // TODO: Check if token is expired an refresh when needed before 401
    request = this.addTokenHeader(request, authToken);

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      }

      return throwError(() => error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = TokenService.getRefreshToken();

      if (token)
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            TokenService.saveAuthToken(token.access_token);
            this.refreshTokenSubject.next(token.access_token);

            return next.handle(this.addTokenHeader(request, token.access_token));
          }),

          catchError((err) => {
            this.isRefreshing = false;

            TokenService.signOut();
            return throwError(() => err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
