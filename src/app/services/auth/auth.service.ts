import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';
import { EventBusService, EventData } from '../event-bus/event-bus.service';
import { SharedService } from '../shared/shared.service';


const AUTH_API = environment.apiUrl + '/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private eventBusService: EventBusService, private sharedService: SharedService) { }

  register(input: RegisterInput): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(AUTH_API + '/register', {
        name: input.name,
        email: input.email,
        password: input.password,
      }, httpOptions)
        .subscribe({
          next: (res: any) => {
            this.eventBusService.emit(new EventData('login', res))
            this.sharedService.loggedIn = true;
            this.getUser()
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
            this.sharedService.loggedIn = true;
            this.getUser()
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
            this.eventBusService.emit(new EventData('sign-out', res))
            this.sharedService.loggedIn = false;
            this.sharedService.user = undefined;
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

  getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get(AUTH_API + '/authorize', httpOptions)
        .subscribe({
          next: (res: any) => {
            const user: User = {
              name: res.name,
              email: res.email,
              createdAt: res.created_at,
              updatedAt: res.updated_at,
            }
            this.sharedService.loggedIn = true;
            this.sharedService.user = user;
            this.eventBusService.emit(new EventData('updated-user', null));
            resolve(user);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
