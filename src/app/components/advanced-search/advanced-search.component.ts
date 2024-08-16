import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlagButtonDirective, FlagIconComponent } from '@flagarchive/angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagButtonDirective, FlagIconComponent],
  selector: 'app-advanced-search',
  standalone: true,
  templateUrl: './advanced-search.component.html',
})
export class AdvancedSearchComponent {}
