import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './login/login.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      /*
        New components go here...
       */
      {
      path: 'login',
      component: LoginComponent,
      }
    ]
  }
];
