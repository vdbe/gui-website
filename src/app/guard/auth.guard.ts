import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { TokenService } from '../services/token/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private jwtHelper: JwtHelperService) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = TokenService.getAuthToken()
        if (!token || this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(['login']);
            return false;
        }
        console.log("Guard true");
        return true;
    }

}
