import { Component, OnInit } from '@angular/core';
import { AuthService, LoginInput } from '../../services/auth/auth.service';
import { EventBusService, EventData } from '../../services/event-bus/event-bus.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private authService: AuthService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    const input: LoginInput = {
      email: 'user02@test.com',
      password: 'toor123',
    }
    this.authService.login(input).subscribe(data => {this.eventBusService.emit(new EventData('login', data))});
  }

}
