import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  computed,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BreadcrumbItem,
  FlagBreadcrumbComponent,
  FlagButtonDirective,
  FlagIconComponent,
} from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { Entity } from '../../models';
import { FlagImageComponent } from '../flag-image';
import { TranslationKeyPipe } from '../../pipes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlagBreadcrumbComponent,
    FlagButtonDirective,
    FlagIconComponent,
    FlagImageComponent,
    TranslateModule,
    TranslationKeyPipe,
  ],
  selector: 'app-entity-header',
  standalone: true,
  styleUrl: './entity-header.component.scss',
  templateUrl: './entity-header.component.html',
})
export class EntityHeaderComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  entity = input.required<Entity>();

  breadcrumb = computed(() => this.#getBreadcrumb());

  @HostBinding('class.expanded') isExpanded = true;

  isMobile = window.innerWidth < 640;

  @HostListener('window:resize') onWindowResize() {
    this.isMobile = window.innerWidth < 640;
  }


  goToEntity(item: BreadcrumbItem) {
    const route = item.link?.split('/');
    this.#router.navigate(route || [], { relativeTo: this.#route });
  }

  toggleState() {
    this.isExpanded = !this.isExpanded;
  }

  // Split the entity ID and create a breadcrumb item for each part of the ID.
  // The link for each item is the entity ID up to that part.
  #getBreadcrumb(): BreadcrumbItem[] {
    const ids = this.entity().id.split('-').slice(0, -1);
    return ids.reduce((list: BreadcrumbItem[], id, index) => {
      const link = `entity/${ids.slice(0, index + 1).join('-')}`;
      return [...list, { link, title: id.toUpperCase() }];
    }, []);
  }
}
