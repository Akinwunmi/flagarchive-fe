import { Routes } from '@angular/router';

import { DiscoverComponent } from './discover.component';

export const DISCOVER_ROUTES: Routes = [
  {
    path: '',
    component: DiscoverComponent,
    title: 'Discover',
    children: [
      {
        path: 'entity',
        loadChildren: () => import('../entity-list').then(m => m.ENTITY_LIST_ROUTES),
      },
    ],
  },
];
