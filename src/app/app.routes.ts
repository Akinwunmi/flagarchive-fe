import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home').then(m => m.HOME_ROUTES),
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: 'error',
    component: PageNotFoundComponent,
  },
  {
    path: 'redirect',
    redirectTo: 'home',
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create').then(m => m.CREATE_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login').then(m => m.LOGIN_ROUTES),
    data: { hideFooter: true },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
