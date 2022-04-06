import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth/auth.service';
import { EventBusService } from './services/event-bus/event-bus.service';
import { SharedService } from './services/shared/shared.service';
import { TokenService } from './services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = environment.title;
  eventBusSubscriptions: Subscription[] = [];

  constructor(private tokenService: TokenService, private authService: AuthService, private eventBusService: EventBusService, private router: Router, private shared: SharedService) {
    if (this.tokenService.getRefreshToken()) {
      this.shared.loggedIn = true;
      this.authService.getUser().catch((err) => {
        console.error(err)
        // TODO: Handle errors
      });
    } else {
      this.shared.loggedIn = false;
    }
  }

  ngOnInit(): void {
    this.eventBusSubscriptions.push(this.eventBusService.on('login', (data: any) => { this.login(data) }))
    this.eventBusSubscriptions.push(this.eventBusService.on('logout', () => { this.logout() }))
    this.eventBusSubscriptions.push(this.eventBusService.on('sign-out', () => { this.signOut() }))
  }

  ngOnDestroy(): void {
    // TODO: test this
    this.eventBusSubscriptions.forEach(subscription => { subscription.unsubscribe() })
  }

  login(data: any): void {
    const refreshToken = this.tokenService.getRefreshToken();

    if (refreshToken) {
      this.authService.logout(refreshToken).catch((err) => {
        // TODO: handle errors
        console.error(err);
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
      console.error(err);
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
    this.router.navigate(['login']);
  }
}
