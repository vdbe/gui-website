import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CreateStateComponent } from './components/create-state/create-state.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', pathMatch: 'prefix', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: 'tasks', component: TasksComponent},
    {path: 'tasks/create', component: CreateTaskComponent},
    {path: 'tasks/edit/:nr', component: UpdateTaskComponent},
    {path: 'states/create', component: CreateStateComponent},
    {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  ]},
  {path: 'register', component: AuthorizeComponent},
  {path: 'login', component: AuthorizeComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'dashboard/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
