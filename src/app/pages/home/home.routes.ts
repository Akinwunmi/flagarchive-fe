import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'discover',
      },
      {
        path: 'discover',
        loadChildren: () => import('../discover').then(m => m.DISCOVER_ROUTES),
      },
    ],
  },
];