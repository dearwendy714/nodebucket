/*
============================================
; Author: Wendy Portillo
; Date:   3/15/2020
; Description: web-450/Nodebucket
;===========================================
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from "./pages/home/home.component";
import { FlexLayoutModule } from '@angular/flex-layout';
// tslint:disable-next-line: max-line-length
import { SigninComponent } from './pages/signin/signin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CookieService} from 'ngx-cookie-service';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { NavComponent } from './shared/nav/nav.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { TasksComponent } from './pages/task/tasks/tasks.component';
import { AboutComponent } from './pages/about/about.component';
import { AddTaskComponent } from './pages/task/add-task/add-task.component';
import { DeleteTaskComponent } from './pages/task/delete-task/delete-task.component';
import { EditTaskComponent } from './pages/task/edit-task/edit-task.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from './shared/guards/auth.guard';
import { TaskCreateDialogComponent } from './shared/task-create-dialog/task-create-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';







@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SigninComponent,
    NavComponent,
    SignoutComponent,
    NotFoundComponent,
    EmployeeComponent,
    TasksComponent,
    AboutComponent,
    AddTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
    TasksComponent,
    TaskCreateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClient,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'}),
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    AuthLayoutComponent,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    DragDropModule

  ],
  providers: [
    CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
