import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService, LoginInput } from '../../services/auth/auth.service';
import { EventBusService, EventData } from '../../services/event-bus/event-bus.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private eventBusService: EventBusService) { }

  ngOnInit(): void { }

  test(): void {

    console.log(this.loginForm.errors)
    console.log(this.loginForm.hasError('email', 'email'))
    console.log(this.loginForm.hasError('email.required'))
    console.log(this.loginForm.hasError('required', 'email'))
  }

  onSubmit(): void {
    const input: LoginInput = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    };

    this.authService.login(input).subscribe({
      next: (data) => this.eventBusService.emit(new EventData("login", data)),
      error: (err) => {
        // TODO: Handle errors
        console.error(err);
      },
    });
  }
}
