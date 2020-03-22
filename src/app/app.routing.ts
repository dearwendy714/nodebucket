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
import { HomeComponent } from './pages/home/home.component';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';



export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate:[SigninComponent]
      },
      {
        path: 'auth',
        component: AuthLayoutComponent,
      },

      {
        path: 'signin',
        component: SigninComponent,
      },
            /*
        New components go here...
       */
    ]
  }
];

