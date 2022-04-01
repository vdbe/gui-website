import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

export type AuthToken = string;
export type RefreshToken = string;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveAuthToken(token: AuthToken): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getAuthToken(): AuthToken | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: AuthToken): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): RefreshToken | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }
}
