import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { State } from 'src/app/interfaces/task-state';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loggedIn?: Boolean;
  user?: User;

  states: State[] = [];
  tasks: Task[] = [];

  constructor() { 
  }

}
