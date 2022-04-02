import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService, RegisterInput } from '../../services/auth/auth.service';
import { EventBusService, EventData } from '../../services/event-bus/event-bus.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordRepeat: [''],
  }, { validator: checkIfFormIsValid });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private eventBusService: EventBusService) { }

  ngOnInit(): void { }

  onSubmit() {
    const input: RegisterInput = {
      username: this.form.get('name')!.value,
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
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

function checkIfFormIsValid(c: AbstractControl) {
  let password = c.get('password')!.value;
  let passwordRepeat = c.get('passwordRepeat')!.value;

  if (password !== passwordRepeat) {
    return { 'passwordsDontMatch': true };
  }

  return null;
}