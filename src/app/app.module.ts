import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authInterceptorProviders } from './interceptors/auth/auth.interceptor';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskStateNamePipe } from './pipes/task-state-name.pipe';
import { MatCardModule } from '@angular/material/card';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TokenService } from './services/token/token.service';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CreateStateComponent } from './components/create-state/create-state.component';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        AuthorizeComponent,
        DashboardComponent,
        LogoutComponent,
        TaskCardComponent,
        TaskStateNamePipe,
        CreateTaskComponent,
        CreateStateComponent,
        TasksComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatCardModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return TokenService.getAuthToken();
                },
            }
        }),
    ],
    providers: [authInterceptorProviders, JwtHelperService],
    bootstrap: [AppComponent],
})
export class AppModule { }
