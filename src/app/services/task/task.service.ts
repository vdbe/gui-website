import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, CreateTaskInput } from '../../interfaces/task';
import { State } from '../../interfaces/task-state'
import { environment } from '../../../environments/environment';

const TASK_API = environment.apiUrl + '/task';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTasks(progress?: string | number, title?: string, desc?: string, createdBy?: string, takenBy?: string): Promise<Task[]> {
    return new Promise<Task[]>((resolve, reject) => {
      let searchParams: any = {};
      if (progress !== undefined) {
        searchParams['progress'] = progress;
      }
      if (title !== undefined) {
        searchParams['title'] = title;
      }
      if (desc !== undefined) {
        searchParams['description'] = desc;
      }
      if (createdBy !== undefined) {
        searchParams['createdBy'] = createdBy;
      }
      if (takenBy !== undefined) {
        searchParams['takenBy'] = takenBy;
      }

      const localHttpOptions = {
        params: searchParams,
        ...httpOptions,
      };

      this.http.get(TASK_API, localHttpOptions)
        .subscribe({
          next: (res: any) => {
            let tasks: Task[] = [];

            for (var i = 0; i < res.length; i++) {
              tasks.push(res[i] as Task);
            }

            resolve(tasks);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  getTask(identifier: number): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      this.http.get(TASK_API + `/${identifier}`, httpOptions)
        .subscribe({
          next: (res: any) => {
            resolve(res as Task);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  getTaskState(identifier: number): Promise<State> {
    return new Promise<State>((resolve, reject) => {
      this.http.get(TASK_API + `/${identifier}`, httpOptions)
        .subscribe({
          next: (res: any) => {
            resolve(res as State);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      this.http.post(TASK_API, createTaskInput, httpOptions)
        .subscribe({
          next: (res: any) => {
            resolve(res as Task);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  updateTaskState(identifier: number, newState: number | string): Promise<State> {
    return new Promise<State>((resolve, reject) => {
      this.http.patch(TASK_API + `/${identifier}/state`, {
        progress: newState,
      }, httpOptions)
        .subscribe({
          next: (res: any) => {
            resolve(res as State);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }
}
