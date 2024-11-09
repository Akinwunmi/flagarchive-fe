import { Routes } from '@angular/router';

import { EntityListComponent } from './entity-list.component';
import { DefaultMainEntity } from '../../models';

export const ENTITY_LIST_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: DefaultMainEntity.Continents,
  },
  {
    path: ':id',
    component: EntityListComponent,
    title: 'Flag Archive - Discover - Entity',
  },
];
