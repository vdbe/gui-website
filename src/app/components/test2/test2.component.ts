import { Component, OnInit } from '@angular/core';
import { EventBusService, EventData } from '../../services/event-bus/event-bus.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.eventBusService.emit(new EventData('logout', null));
  }
}
