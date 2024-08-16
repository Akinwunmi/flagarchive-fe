import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Entity } from '../../models';
import { FlagImageComponent } from '../flag-image';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagImageComponent, NgClass],
  selector: 'app-entity',
  standalone: true,
  styleUrl: './entity.component.scss',
  templateUrl: './entity.component.html',
})
export class EntityComponent {
  entity = input.required<Entity>();
  card = input(true);

  setAltParentId(id: string): string {
    return id.split('-').pop() || '';
  }
}
