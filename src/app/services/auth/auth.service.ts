import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: email,
      password: password
    }, httpOptions);
  }

  logout(refreshToken: string): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {
      refresh_token: refreshToken
    }, httpOptions);
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(AUTH_API + 'token', {
      refresh_token: token
    }, httpOptions);
  }

  getUser(roken: string): Observable<any> {
    return this.http.get(AUTH_API + 'authorize', httpOptions);
  }
}
