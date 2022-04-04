import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventBusService, EventData } from '../event-bus/event-bus.service';


const AUTH_API = environment.apiUrl + '/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private eventBusService: EventBusService) { }

  register(input: RegisterInput): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(AUTH_API + '/register', {
        email: input.email,
        password: input.password,
      }, httpOptions)
        .subscribe({
          next: (res: any) => {
            this.eventBusService.emit(new EventData('register', res))
            resolve();
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  login(input: LoginInput): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(AUTH_API + '/login', {
        email: input.email,
        password: input.password,
      }, httpOptions)
        .subscribe({
          next: (res: any) => {
            this.eventBusService.emit(new EventData('login', res))
            resolve();
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  logout(refreshToken: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(AUTH_API + '/logout', {
        refresh_token: refreshToken
      }, httpOptions)
        .subscribe({
          next: (res: any) => {
            this.eventBusService.emit(new EventData('logout', res))
            resolve();
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  refreshToken(token: string): Observable<Object> {
    return this.http.post(AUTH_API + '/token', {
      refresh_token: token
    }, httpOptions);
  }

  updateUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get(AUTH_API + '/authorize', httpOptions)
        .subscribe({
          next: (res: any) => {
            this.eventBusService.emit(new EventData('update-user', res))
            resolve();
          },
          error: (err) => {
            reject(err);
          }
        });
    });
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