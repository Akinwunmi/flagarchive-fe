import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FlagPillComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { Entity, EntityFlag, EntityFullRange, EntityRange, FlagCategory } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStore } from '../../state';
import { FlagImageComponent } from '../flag-image';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagImageComponent, FlagPillComponent, NgClass, TranslateModule, TranslationKeyPipe],
  selector: 'app-entity',
  standalone: true,
  styleUrl: './entity.component.css',
  templateUrl: './entity.component.html',
})
export class EntityComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  entity = input.required<Entity>();
  card = input(true);
  range = input<EntityFullRange | EntityRange>();

  activeFlagCategory = this.#advancedSearchStore.flagCategory;

  altParentId = computed(() => this.range()?.altParentId ?? this.entity().altParentId);
  translationKey = computed(() => this.range()?.translationKey ?? this.entity().translationKey);
  url = computed(
    () => (this.range() as EntityFullRange)?.url ?? this.#getActiveFlagUrl(this.entity().flags),
  );

  setAltParentId(id?: string) {
    return id?.split('-').pop() || '';
  }

  #getActiveFlagUrl(flags?: Record<FlagCategory, EntityFlag>) {
    return flags?.[this.activeFlagCategory()]?.url;
  }
}
