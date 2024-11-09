import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home').then(m => m.HOME_ROUTES),
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
];
