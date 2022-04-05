import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './interfaces/user';
import { AuthService } from './services/auth/auth.service';
import { EventBusService } from './services/event-bus/event-bus.service';
import { TokenService } from './services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = environment.title;
  eventBusSubscriptions: Subscription[] = [];

  loggedIn: Boolean = false;
  user: User | null = null;

  constructor(private tokenService: TokenService, private authService: AuthService, private eventBusService: EventBusService, private router: Router) {
    console.log(this.tokenService.getRefreshToken())
    console.log(this.loggedIn)
    console.log(this.user)
    console.log(router)

    if (this.tokenService.getRefreshToken() == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.eventBusSubscriptions.push(this.eventBusService.on('login', (data: any) => { this.login(data) }))
    this.eventBusSubscriptions.push(this.eventBusService.on('update-user', (data: any) => { this.updateUser(data) }))
    this.eventBusSubscriptions.push(this.eventBusService.on('logout', () => { this.logout() }))
    this.eventBusSubscriptions.push(this.eventBusService.on('sign-out', () => { this.signOut() }))
  }

  ngOnDestroy(): void {
    // TODO: test this
    this.eventBusSubscriptions.forEach( subscription => { subscription.unsubscribe() })
  }

  login(data: any): void {
    const refreshToken = this.tokenService.getRefreshToken();

    if (refreshToken) {
      this.authService.logout(refreshToken).catch((err) => {
        // TODO: handle errors
        console.log(err);
      })
    }

    this.tokenService.saveAuthToken(data.access_token);
    this.tokenService.saveRefreshToken(data.refresh_token);
    
    this.router.navigate(['dashboard']);
  }

  logout(): void {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      this.router.navigate(['login']);
      return;
    }

    this.authService.logout(refreshToken).catch((err) => {
      // TODO: handle errors
      console.log(err);
    })
  }

  signOut(): void {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      console.error('Tried to signout without stored refresh token')
      this.router.navigate(['login']);
      return;
    }

    this.tokenService.signOut();
    this.loggedIn = false;
    this.user = null;

    this.router.navigate(['login']);
  }

  updateUser(data: any): void {
    this.loggedIn = true;
    const user: User = {
      name: data.name,
      email: data.email,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
    console.log(user);
    this.user = user;
  }
}
