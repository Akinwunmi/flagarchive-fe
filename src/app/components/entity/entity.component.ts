import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FlagPillComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { Entity, EntityFlag, EntityRange, FlagCategory } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStateKey, AdvancedSearchStore } from '../../state';
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
  range = input<EntityRange>();

  activeFlagCategory = this.#advancedSearchStore[AdvancedSearchStateKey.FlagCategory];

  altParentId = computed(() => this.range()?.altParentId ?? this.entity().altParentId);
  translationKey = computed(() => this.range()?.translationKey ?? this.entity().translationKey);
  url = computed(() => this.#getActiveFlagUrl(this.range()?.flags ?? this.entity().flags));

  setAltParentId(id?: string) {
    return id?.split('-').pop() || '';
  }

  #getActiveFlagUrl(flags?: Record<FlagCategory, EntityFlag>) {
    return flags?.[this.activeFlagCategory()]?.url;
  }
}
