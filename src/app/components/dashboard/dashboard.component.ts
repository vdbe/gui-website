import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/interfaces/task-state';
import { StateService } from 'src/app/services/task/state.service';
import { TaskService } from 'src/app/services/task/task.service';
import { SharedService } from '../../services/shared/shared.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  states: State[] = [];
  tasks: Task[] = [];


  constructor(public shared: SharedService, private router: Router, private stateService: StateService, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.updateTasksAndStates();
  }

  updateTasksAndStates(): void {
    // I don't care anymore, just want it done
    this.taskService.getTasks().then((tasks) => {
      this.tasks = tasks;
    }).then(() => {
      let stateIds: Set<number> = new Set();
      this.tasks.forEach((task) => {
        stateIds.add(task.progress);
      });

      let statePromises: Array<Promise<State>> = [];
      stateIds.forEach((state) => {
        statePromises.push(this.stateService.getState(state));
      });

      Promise.all(statePromises).then((states) => {
        states.sort((a, b) => a.progress - b.progress);
        this.states = states;
      });
    });
  }
}

