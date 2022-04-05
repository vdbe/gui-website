import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  index: number;

  constructor(private router: Router) { 
    this.index = this.router.url == '/login' ? 0 : 1;
  }
}
