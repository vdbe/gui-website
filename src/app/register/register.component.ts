import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  profileForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordRepeat: [''],
  }, {validator: checkIfFormIsValid});


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}

function checkIfFormIsValid(c: AbstractControl) {
  let password = c.get('password')!.value;
  let passwordRepeat = c.get('passwordRepeat')!.value;

  if (password !== passwordRepeat) {
    return {'passwordsDontMatch': true};
  }

  return null;
}