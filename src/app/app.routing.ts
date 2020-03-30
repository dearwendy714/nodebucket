/*
 *  Title: app.routing.ts
 *  Author: Professor Cristy Cross
 *  Modified by: Wendy Portillo
 *  Date: 5 March 2020
 *  Description: Routing nodebucket app.
 */

 // Required modules


import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { TaskCreateDialogComponent } from './shared/task-create-dialog/task-create-dialog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LandingComponent } from './pages/landing/landing.component';




export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
        // canActivate:[LandingComponent]

      },
      {
        path: 'task',
        component: HomeComponent,
        // canActivate:[SigninComponent]
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'auth',
        component: AuthLayoutComponent,
      },

      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'task-create-dialog',
        component: TaskCreateDialogComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent
      }
            /*
        New components go here...
       */
    ]
  }
];

