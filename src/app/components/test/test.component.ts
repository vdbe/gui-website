import { Component, OnInit } from '@angular/core';
import { EventData } from 'src/app/classes/event/event';

import { AuthService } from '../../services/auth/auth.service';
import { EventBusService } from '../../services/event-bus/event-bus.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private authService: AuthService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.authService.login('user01@test.com', 'toor123').subscribe(data => {this.eventBusService.emit(new EventData('login', data))});
  }

}
