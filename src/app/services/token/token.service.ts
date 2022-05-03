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

  static signOut(): void {
    window.localStorage.clear();
  }

  static saveAuthToken(token: AuthToken): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  static getAuthToken(): AuthToken | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  static saveRefreshToken(token: AuthToken): void {
    window.localStorage.removeItem(REFRESHTOKEN_KEY);
    window.localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  static getRefreshToken(): RefreshToken | null {
    return window.localStorage.getItem(REFRESHTOKEN_KEY);
  }
}
