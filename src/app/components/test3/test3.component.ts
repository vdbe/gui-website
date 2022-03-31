import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    let oldToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NjQ0ODMyZC0yM2JmLTQ0NTctOGIzZC1jNDhlMTNkYjg0MGQiLCJleHAiOjE2NDg0MDA3NTIsImlhdCI6MTY0ODMxNDM1Mn0._A1eRWqqFD58cCc1OVX2snJ5fMdLiO38tYP7N_ESB3o';
    this.tokenService.saveAuthToken(oldToken);
    this.http.get('http://localhost:3000/auth/authorize').subscribe(data => { console.log(data) }, err => {console.error(err)})

  }

}
