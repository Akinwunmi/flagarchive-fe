import { Routes } from '@angular/router';

import { DiscoverComponent } from './discover.component';

export const DISCOVER_ROUTES: Routes = [
  {
    path: '',
    component: DiscoverComponent,
    title: 'Flag Archive - Discover',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'entity'
      },
      {
        path: 'entity',
        loadChildren: () => import('../entity-list').then(m => m.ENTITY_LIST_ROUTES),
      },
    ],
  },
];
