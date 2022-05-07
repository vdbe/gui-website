import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TaskService } from '../../services/task/task.service';
import { StateService } from '../../services/task/state.service';
import { State } from 'src/app/interfaces/task-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(public shared: SharedService, private taskService: TaskService, private stateService: StateService) { }

  ngOnInit(): void {
    this.updateTasksAndStates().then();
  }
  
  async updateTasksAndStates(): Promise<void> {
    // I don't care anymore, just want it done
    this.taskService.getTasks().then((tasks) => {
      this.shared.tasks = tasks;
    }).then(() => {
      let stateIds: Set<number> = new Set();
      this.shared.tasks.forEach((task) => {
        stateIds.add(task.progress);
      });

      let statePromises: Array<Promise<State>> = [];
      stateIds.forEach((state) => {
        statePromises.push(this.stateService.getState(state));
      });

      Promise.all(statePromises).then((states) => {
        states.sort((a, b) => a.progress - b.progress);
        this.shared.states = states;
      });
    });
  }

}

