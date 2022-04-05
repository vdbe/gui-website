import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent {
  index: number;

  constructor(private router: Router) { 
    this.index = this.router.url == '/login' ? 0 : 1;
  }
}
