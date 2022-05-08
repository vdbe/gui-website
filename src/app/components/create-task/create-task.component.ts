import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CreateTaskInput, Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
    createTaskForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        progress: new FormControl('', [Validators.required]),
    })
    matcher = new MyErrorStateMatcher();

    constructor(public shared: SharedService, private taskservice: TaskService, private router: Router) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const input: CreateTaskInput = {
            title: this.createTaskForm.get('name')!.value,
            description: this.createTaskForm.get('description')!.value,
            state: this.createTaskForm.get('progress')!.value,
        };

        this.taskservice.createTask(input).then((task: Task) => {
            this.shared.tasks.push(task);
            this.router.navigate(['/dashboard/tasks']);
        })
    }

}
