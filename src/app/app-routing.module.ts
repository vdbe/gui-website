import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TestComponent } from './components/test/test.component';
import { Test2Component } from './components/test2/test2.component';
import { Test3Component } from './components/test3/test3.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent},
  {path: 'test2', component: Test2Component},
  {path: 'test3', component: Test3Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
