import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Task } from '../../interfaces/task';
import { CustomPipePipe } from '../../pipes/custom-pipe.pipe';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Input() stateName?: string;

  enabled: boolean = false;

  constructor(private shared: SharedService) {
  }

  ngOnInit(): void {
      // TODO: This does not work!!!!!!!!!!!!!
      if(!this.task.takenBy || this.task.takenBy == this.shared.user!.email || this.task.createdBy == this.shared.user?.email) {
          this.enabled = false;
      }
  }

}
