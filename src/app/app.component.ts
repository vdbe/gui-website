import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
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

  constructor(private tokenService: TokenService, private authService: AuthService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.eventBusSubscriptions.push(this.eventBusService.on('logout', () => { this.logout() }))
    this.eventBusSubscriptions.push(this.eventBusService.on('login', (data: any) => { this.login(data) }))
  }

  ngOnDestroy(): void {
    // TODO: test this
    this.eventBusSubscriptions.forEach( subscription => { subscription.unsubscribe() })
  }

  login(data: any): void {
    this.tokenService.saveAuthToken(data.access_token);
    this.tokenService.saveRefreshToken(data.refresh_token);
  }

  logout(): void {
    let refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      console.error('Tried to logout without stored refresh token')
      return;
    }

    this.authService.logout(refreshToken).subscribe(
      next => {
        this.tokenService.signOut();
      }, err => {
        console.error(`Failed to logout: ${err}`)
      });
  }
}
