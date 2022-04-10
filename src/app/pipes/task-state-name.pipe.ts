import { Pipe, PipeTransform } from '@angular/core';
import { State } from '../interfaces/task-state';

@Pipe({
  name: 'taskStateName'
})
export class TaskStateNamePipe implements PipeTransform {

  transform(states: State[], progress: number, ...args: unknown[]): string | undefined {
    return states.find((state) => state.progress === progress)?.name;
  }

}
