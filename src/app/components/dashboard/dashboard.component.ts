import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(public shared: SharedService, private router: Router) {
    console.log(this.shared)
    if (!this.shared.loggedIn) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void { }
}
