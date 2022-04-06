import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loggedIn: Boolean = false;
  user: User | null = null;

  constructor() { }
}
