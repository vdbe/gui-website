import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'prefix', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: 'tasks', component: TasksComponent},
    {path: 'tasks/create', component: CreateTaskComponent},
    //{path: '**', redirectTo: 'tasks'},
  ]},
  {path: 'register', component: AuthorizeComponent},
  {path: 'login', component: AuthorizeComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
