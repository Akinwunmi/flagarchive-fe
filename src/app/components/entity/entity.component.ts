import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

import { Entity } from '../../models';
import { FlagImageComponent } from '../flag-image';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [FlagImageComponent, NgClass],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent {
  entity = input.required<Entity>();
  card = input(true);
}
