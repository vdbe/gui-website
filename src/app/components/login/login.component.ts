import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService, LoginInput } from '../../services/auth/auth.service';
import { EventBusService, EventData } from '../../services/event-bus/event-bus.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private eventBusService: EventBusService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const input: LoginInput = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
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
