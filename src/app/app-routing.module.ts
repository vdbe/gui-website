import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'prefix', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'register', component: AuthorizeComponent},
  {path: 'login', component: AuthorizeComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
