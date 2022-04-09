import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { State, updateStateInput } from '../../interfaces/task-state'

const STATE_API = environment.apiUrl + '/state';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  getStates(name?: string, desc?: string): Promise<State[]> {
    return new Promise<State[]>((resolve, reject) => {
      let searchParams: any = {};
      if (name !== undefined) {
        searchParams['name'] = name;
      }
      if (desc !== undefined) {
        searchParams['description'] = desc;
      }

      const localHttpOptions = {
        params: searchParams,
        ...httpOptions,
      };

      this.http.get(STATE_API, localHttpOptions)
        .subscribe({
          next: (res: any) => {
            let states: State[] = [];

            for (var i = 0; i < res.length; i++) {
              states.push(res[i] as State);
            }

            resolve(states);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  getState(identifier: number | string): Promise<State> {
    return new Promise<State>((resolve, reject) => {
      this.http.get(STATE_API + `/${identifier}`, httpOptions)
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

  createState(state: State): Promise<State> {
    return new Promise<State>((resolve, reject) => {
      this.http.post(STATE_API,
        {
          name: state.name,
          description: state.description,
          progress: state.progress
        }
        , httpOptions)
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

  updateState(identifier: number | string, updateStateInput: updateStateInput): Promise<State> {
    return new Promise<State>((resolve, reject) => {
      this.http.patch(STATE_API + `/${identifier}`, updateStateInput, httpOptions)
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
