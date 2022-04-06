import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent {
  index: number;

  constructor(private router: Router, private shared: SharedService) { 
    if (this.shared.loggedIn) {
      this.router.navigate(['dashboard']);
    }
    this.index = this.router.url == '/login' ? 0 : 1;
  }
}
