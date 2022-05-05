import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(public shared: SharedService) { }

  ngOnInit(): void {
  }


}
