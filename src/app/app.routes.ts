import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home').then(m => m.HOME_ROUTES),
  }
];
