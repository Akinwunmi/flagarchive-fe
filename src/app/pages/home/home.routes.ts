import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Flag Archive',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'discover',
      },
      {
        path: 'create',
        loadChildren: () => import('../create').then(m => m.CREATE_ROUTES),
      },
      {
        path: 'discover',
        loadChildren: () => import('../discover').then(m => m.DISCOVER_ROUTES),
      },
    ],
  },
];
