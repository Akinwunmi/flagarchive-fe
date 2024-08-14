import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-header',
  standalone: true,
  styleUrl: './entity-header.component.scss',
  templateUrl: './entity-header.component.html',
})
export class EntityHeaderComponent {}
