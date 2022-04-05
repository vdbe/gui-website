import { Component } from '@angular/core';
import { EventBusService, EventData } from 'src/app/services/event-bus/event-bus.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private eventBusService: EventBusService) {
    this.eventBusService.emit(new EventData('logout', null));
  }
}
