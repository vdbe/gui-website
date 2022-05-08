import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Task, updateTaskInput } from 'src/app/interfaces/task';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TaskService } from 'src/app/services/task/task.service';
import { State } from 'src/app/interfaces/task-state';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-update-task',
    templateUrl: './update-task.component.html',
    styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {

    taskNr!: number;
    task!: Task;
    creator: boolean = false;

    updateTaskForm = new FormGroup({
        name: new FormControl('test123', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        progress: new FormControl('', [Validators.required]),
    })

    matcher = new MyErrorStateMatcher();

    constructor(private route: ActivatedRoute, private router: Router, public shared: SharedService, private taskService: TaskService) {
        this.taskNr = this.route.snapshot.params['nr'] as number;
        const tmpTask = this.shared.tasks.find(task => task.nr == this.taskNr)
        if (!tmpTask) {
            this.router.navigate(['/dashboard/tasks']);
            return;
        }
        this.task = tmpTask;
        const nameFormControl = this.updateTaskForm.get('name')!;
        const descriptionFormControl = this.updateTaskForm.get('description')!;



        nameFormControl.setValue(this.task.title);
        descriptionFormControl.setValue(this.task.description);

        // TODO: To lazy to inmplement it
        if (this.task.createdBy !== this.shared.user!.email || true) {
            nameFormControl.disable();
            descriptionFormControl.disable();
        } else {
            this.creator = true;
        }

        this.updateTaskForm.get('progress')!.setValue(this.task.progress);
    }

    ngOnInit(): void {
        console.log(this.task)

    }

    onSubmit(): void {
        let update = false;
        let input: updateTaskInput = {};
        const newState = this.updateTaskForm.get('progress')!.value;
        if (newState as number !== this.task.progress) {
            input.progress = newState as number;
            update = true;
        }

        if (this.creator) {
            let newName = this.updateTaskForm.get('name')!.value;
            if (newName !== this.task.title) {
                console.warn("Updating title has not yet been implemented");
                input.title = newName;
                update = true;
            }

            let newDescription = this.updateTaskForm.get('description')!.value;
            if (newDescription !== this.task.description) {
                console.warn("Updating desc has not yet been implemented");
                input.description = newDescription;
                update = true;
            }
        }

        if (update) {
            this.taskService.updateTaskState(this.taskNr, input.progress!).then((state: State) => {
                this.task.progress = state.progress;
                this.router.navigate(['/dashboard/tasks']);
            });
        } else {

            this.router.navigate(['/dashboard/tasks']);
        }
    }

}
