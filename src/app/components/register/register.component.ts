import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService, RegisterInput } from '../../services/auth/auth.service';
import { EventBusService, EventData } from '../../services/event-bus/event-bus.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  }, passwordMatch)
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private eventBusService: EventBusService) { }

  ngOnInit(): void { }

  onSubmit() {
    const input: RegisterInput = {
      username: this.registerForm.get('name')!.value,
      email: this.registerForm.get('email')!.value,
      password: this.registerForm.get('password')!.value,
    }

    this.authService.register(input).subscribe({
      next: (data) => this.eventBusService.emit(new EventData("login", data)),
      error: (err) => {
        // TODO: Handle errors
        console.error(err);
      },
    });
  }
}

function passwordMatch(control: AbstractControl): ValidationErrors | null {
  let password = control.get('password')?.value;
  let passwordRepeat = control.get('passwordRepeat')?.value;

  if (password !== passwordRepeat) {
    return { 'passwordsDontMatch': true };
  }

  return null;
}

function checkIfFormIsValid(c: AbstractControl): ValidationErrors | null {
  let password = c.get('password')!.value;
  let passwordRepeat = c.get('passwordRepeat')!.value;

  if (password !== passwordRepeat) {
    return { 'passwordsDontMatch': true };
  }

  return null;
}