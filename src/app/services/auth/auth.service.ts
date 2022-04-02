import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const AUTH_API = environment.apiUrl + '/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(input: RegisterInput): Observable<Object> {
    return this.http.post(AUTH_API + 'register', {
      name: input.username,
      email: input.email,
      password: input.password,
    }, httpOptions);
  }

  login(input: LoginInput): Observable<Object> {
    return this.http.post(AUTH_API + 'login', {
      email: input.email,
      password: input.password,
    }, httpOptions);
  }

  logout(refreshToken: string): Observable<Object> {
    return this.http.post(AUTH_API + 'logout', {
      refresh_token: refreshToken
    }, httpOptions);
  }

  refreshToken(token: string): Observable<Object> {
    return this.http.post(AUTH_API + 'token', {
      refresh_token: token
    }, httpOptions);
  }

  getUser(roken: string): Observable<Object> {
    return this.http.get(AUTH_API + 'authorize', httpOptions);
  }
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}