import { Component, OnInit } from '@angular/core';

import { TokenService } from '../../services/token/token.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    let email = 'user01@test.com';
    let password = 'password';

    this.authService.login(email, password).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  onSubmit(): void {
  }

}
