import { Routes } from '@angular/router';

import { EntityListComponent } from './entity-list.component';

export const ENTITY_LIST_ROUTES: Routes = [
  {
    path: ':id',
    component: EntityListComponent,
    title: 'Entity',
  },
];
