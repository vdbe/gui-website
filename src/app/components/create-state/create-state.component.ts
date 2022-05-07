import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/task/state.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { State } from 'src/app/interfaces/task-state';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.scss']
})
export class CreateStateComponent implements OnInit {
  createStateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    progress: new FormControl('', [Validators.required]),
  })
  matcher = new MyErrorStateMatcher();

  constructor(private stateService: StateService, private shared: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
      console.log("??")
      const input: State = {
          name: this.createStateForm.get('name')!.value,
          description: this.createStateForm.get('description')!.value,
          progress: this.createStateForm.get('progress')!.value as number,
      };

    this.stateService.createState(input).then((state: State) => {
      this.shared.states.push(state);
      this.router.navigate(['/dashboard/tasks']);
    })

  }

}
